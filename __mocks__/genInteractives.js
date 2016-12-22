import JSXAttributeMock from 'JSXAttributeMock';
import JSXElementMock from 'JSXElementMock';
import DOMElements from '../src/util/attributes/DOM.json';
import roles from '../src/util/attributes/role.json';

const pureInteractiveElements = Object.keys(DOMElements)
  .filter(name => DOMElements[name].interactive === true)
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

const pureNonInteractiveElementsMap = Object.keys(DOMElements)
  .filter(name => !DOMElements[name].interactive)
  .reduce((nonInteractiveElements, name) => {
    nonInteractiveElements[name] = [];
    return nonInteractiveElements;
  }, {});

const nonInteractiveElementsMap = {
  ...pureNonInteractiveElementsMap,
  input: [
    {prop: 'type', value: 'hidden'}
  ],
};

const interactiveRoles = Object.keys(roles).filter(
  role => roles[role].interactive === true
);

const nonInteractiveRoles = Object.keys(roles).filter(
  role => roles[role].interactive === false
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
