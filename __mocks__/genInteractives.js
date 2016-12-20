import JSXAttributeMock from 'JSXAttributeMock';
import JSXElementMock from 'JSXElementMock';
import DOMElements from '../src/util/attributes/DOM.json';
import roles from '../src/util/attributes/role.json';

const pureInteractiveElements = {};
Object.keys(DOMElements)
  .filter(name => DOMElements[name].interactive === true)
  .forEach(name => pureInteractiveElements[name] = []);

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

const pureNonInteractiveElementsMap = {};
Object.keys(DOMElements)
  .filter(name => !DOMElements[name].interactive)
  .forEach(name => pureNonInteractiveElementsMap[name] = []);

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
  const elements = [];
  for (const name in interactiveElementsMap) {
    const attributes = interactiveElementsMap[name].map(
      ({prop, value}) => JSXAttributeMock(prop, value)
    );
    elements.push(JSXElementMock(name, attributes));
  }
  return elements;
}

export function genInteractiveRoleElements () {
  return interactiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}

export function genNonInteractiveElements () {
  const elements = [];
  for (const name in nonInteractiveElementsMap) {
    const attributes = nonInteractiveElementsMap[name].map(
      ({prop, value}) => JSXAttributeMock(prop, value)
    );
    elements.push(JSXElementMock(name, attributes));
  }
  return elements;
}

export function genNonInteractiveRoleElements () {
  return nonInteractiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}
