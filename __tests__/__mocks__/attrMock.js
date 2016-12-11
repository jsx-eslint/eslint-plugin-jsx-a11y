export default function attrMock (prop, value) {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: prop,
    },
    value: {
      type: 'Literal',
      value: value,
    }
  };
}
