/**
 * @flow
 */

import {
  dom,
  roles,
} from 'aria-query';
import JSXAttributeMock from './JSXAttributeMock';
import JSXElementMock from './JSXElementMock';

const domElements = [...dom.keys()];
const roleNames = [...roles.keys()];

const interactiveElementsMap = {
  a: [{prop: 'href', value: '#'}],
  area: [{prop: 'href', value: '#'}],
  button: [],
  input: [],
  'input[type=\"button\"]': [{prop: 'type', value: 'button'}],
  'input[type=\"checkbox\"]': [{prop: 'type', value: 'checkbox'}],
  'input[type=\"color\"]': [{prop: 'type', value: 'color'}],
  'input[type=\"date\"]': [{prop: 'type', value: 'date'}],
  'input[type=\"datetime\"]': [{prop: 'type', value: 'datetime'}],
  'input[type=\"datetime\"]': [{prop: 'type', value: 'datetime'}],
  'input[type=\"email\"]': [{prop: 'type', value: 'email'}],
  'input[type=\"file\"]': [{prop: 'type', value: 'file'}],
  'input[type=\"image\"]': [{prop: 'type', value: 'image'}],
  'input[type=\"month\"]': [{prop: 'type', value: 'month'}],
  'input[type=\"number\"]': [{prop: 'type', value: 'number'}],
  'input[type=\"password\"]': [{prop: 'type', value: 'password'}],
  'input[type=\"radio\"]': [{prop: 'type', value: 'radio'}],
  'input[type=\"range\"]': [{prop: 'type', value: 'range'}],
  'input[type=\"reset\"]': [{prop: 'type', value: 'reset'}],
  'input[type=\"search\"]': [{prop: 'type', value: 'search'}],
  'input[type=\"submit\"]': [{prop: 'type', value: 'submit'}],
  'input[type=\"tel\"]': [{prop: 'type', value: 'tel'}],
  'input[type=\"text\"]': [{prop: 'type', value: 'text'}],
  'input[type=\"time\"]': [{prop: 'type', value: 'time'}],
  'input[type=\"url\"]': [{prop: 'type', value: 'url'}],
  'input[type=\"week\"]': [{prop: 'type', value: 'week'}],
  menuitem:[],
  option: [],
  select: [],
  'table[role="grid"]': [{prop: 'role', value: 'grid'}],
  'td[role="gridcell"]': [{prop: 'role', value: 'gridcell'}],
  tr: [],
  textarea: [],
};

const nonInteractiveElementsMap = {
  area: [],
  article: [],
  dd: [],
  dfn: [],
  dt: [],
  fieldset: [],
  figure: [],
  form: [],
  frame: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  hr: [],
  img: [],
  'input[type=\"hidden\"]': [{prop: 'type', value: 'hidden'}],
  li: [],
  main: [],
  nav: [],
  ol: [],
  table: [],
  td: [],
  tbody: [],
  tfoot: [],
  thead: [],
  ul: [],
};

const indeterminantInteractiveElementsMap = domElements
  .reduce(
    (
      accumulator: {[key: string]: Array<any>},
      name: string
    ): {[key: string]: Array<any>} => {
      accumulator[name] = [];
      return accumulator;
    },
    {},
  );

Object.keys(interactiveElementsMap)
  .concat(Object.keys(nonInteractiveElementsMap))
  .forEach(
    (name: string) => delete indeterminantInteractiveElementsMap[name]
  );

const abstractRoles = roleNames
  .filter(role => roles.get(role).abstract);

const nonAbstractRoles = roleNames
  .filter(role => !roles.get(role).abstract);

const interactiveRoles = []
  .concat(
    roleNames,
    // 'toolbar' does not descend from widget, but it does support
    // aria-activedescendant, thus in practice we treat it as a widget.
    'toolbar',
  )
  .filter(role => !roles.get(role).abstract)
  .filter(role => roles.get(role).superClass.some(
    klasses => klasses.includes('widget')),
  );

const nonInteractiveRoles = roleNames
  .filter(role => !roles.get(role).abstract)
  .filter(role => !roles.get(role).superClass.some(
    klasses => klasses.includes('widget')),
  )
  // 'toolbar' does not descend from widget, but it does support
  // aria-activedescendant, thus in practice we treat it as a widget.
  .filter(role => !['toolbar'].includes(role));

export function genElementSymbol (
  openingElement: Object,
) {
  return openingElement.name.name + (
    (openingElement.attributes.length > 0)
      ? `${openingElement.attributes.map(
        attr => `[${attr.name.name}=\"${attr.value.value}\"]` ).join('')
      }`
      : ''
  );
};

export function genInteractiveElements () {
  return Object.keys(interactiveElementsMap)
    .map(elementSymbol => {
      const bracketIndex = elementSymbol.indexOf('[');
      let name = elementSymbol;
      if (bracketIndex > -1) {
        name = elementSymbol.slice(0, bracketIndex);
      }
      const attributes = interactiveElementsMap[elementSymbol].map(
        ({prop, value}) => JSXAttributeMock(prop, value)
      );
      return JSXElementMock(name, attributes);
    });
}

export function genInteractiveRoleElements () {
  return interactiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}

export function genNonInteractiveElements () {
  return Object.keys(nonInteractiveElementsMap)
    .map(elementSymbol => {
      const bracketIndex = elementSymbol.indexOf('[');
      let name = elementSymbol;
      if (bracketIndex > -1) {
        name = elementSymbol.slice(0, bracketIndex);
      }
      const attributes = nonInteractiveElementsMap[elementSymbol].map(
        ({prop, value}) => JSXAttributeMock(prop, value)
      );
      return JSXElementMock(name, attributes);
    });
}

export function genNonInteractiveRoleElements () {
  return nonInteractiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}

export function genAbstractRoleElements () {
  return abstractRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
};

export function genNonAbstractRoleElements () {
  return nonAbstractRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
};

export function genIndeterminantInteractiveElements () {
  return Object.keys(indeterminantInteractiveElementsMap)
    .map(name => {
      const attributes = indeterminantInteractiveElementsMap[name].map(
        ({prop, value}) => JSXAttributeMock(prop, value)
      );
      return JSXElementMock(name, attributes);
    });
}
