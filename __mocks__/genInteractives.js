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

const pureInteractiveElements = domElements
  .filter(name => dom.get(name).interactive === true)
  .reduce((interactiveElements, name) => {
    interactiveElements[name] = [];
    return interactiveElements;
  }, {});

const interactiveElementsMap = {
  ...pureInteractiveElements,
  a: [
    {prop: 'href', value: '#'}
  ],
  area: [
    {prop: 'href', value: '#'}
  ],
  input: [
    {prop: 'type', value: 'text'}
  ],
};

const pureNonInteractiveElementsMap = {
  a: [],
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
  input: [],
  li: [],
  nav: [],
  ol: [],
  table: [],
  tbody: [],
  tfoot: [],
  thead: [],
  tr: [],
  ul: [],
};

const nonInteractiveElementsMap = {
  ...pureNonInteractiveElementsMap,
  input: [
    {prop: 'type', value: 'hidden'}
  ],
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

const interactiveRoles = roleNames.filter(
  role => roles.get(role).interactive === true
);

const nonInteractiveRoles = roleNames.filter(
  role => roles.get(role).interactive === false
);

export function genInteractiveElements () {
  return Object.keys(interactiveElementsMap)
    .map(name => {
      const attributes = interactiveElementsMap[name].map(
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
    .map(name => {
      const attributes = nonInteractiveElementsMap[name].map(
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

export function genIndeterminantInteractiveElements () {
  return Object.keys(indeterminantInteractiveElementsMap)
    .map(name => {
      const attributes = indeterminantInteractiveElementsMap[name].map(
        ({prop, value}) => JSXAttributeMock(prop, value)
      );
      return JSXElementMock(name, attributes);
    });
}
