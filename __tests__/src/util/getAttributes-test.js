import test from 'tape';

import getAttributes from '../../../src/util/getAttributes';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

const componentsSettings = {
  'jsx-a11y': {
    components: {
      Button: 'button',
      MyInput: {
        component: 'input',
        attributes: {
          type: ['myType'],
        },
      },
      Link: {
        component: 'a',
        attributes: {
          href: ['to', 'href'],
          onClick: ['onClick', 'handleClick'],
        },
      },
    },
  },
};

test('getAttributes', (t) => {
  t.test('no settings in context', (st) => {
    st.deepEqual(
      getAttributes(
        JSXElementMock('input').openingElement,
        'input',
        {},
      ),
      [],
      'returns no attributes',
    );

    st.deepEqual(
      getAttributes(
        JSXElementMock('input', [JSXAttributeMock('type', 'text')]).openingElement,
        'input',
        {},
      ),
      [JSXAttributeMock('type', 'text')],
      'returns raw attributes if no settings are provided',
    );

    st.end();
  });

  t.test('components settings in context', (st) => {
    st.deepEqual(
      getAttributes(
        JSXElementMock('MyInput', [JSXAttributeMock('type', 'text')]).openingElement,
        'input',
        { settings: componentsSettings },
      ),
      [JSXAttributeMock('myType', 'text')],
      'should expect a custom attribute name mapping to `myType`',
    );

    st.deepEqual(
      getAttributes(
        JSXElementMock('input', [JSXAttributeMock('type', 'text')]).openingElement,
        'input',
        { settings: componentsSettings },
      ),
      [JSXAttributeMock('type', 'text')],
      'should not expect a custom attribute name when native element is used',
    );

    st.deepEqual(
      getAttributes(
        JSXElementMock('Button', [JSXAttributeMock('type', 'text')]).openingElement,
        'button',
        { settings: componentsSettings },
      ),
      [JSXAttributeMock('type', 'text')],
      'should not expect a custom attribute name when no custom attributes configured',
    );

    st.deepEqual(
      getAttributes(
        JSXElementMock('Link', [JSXAttributeMock('href', '/path'), JSXAttributeMock('onClick', 'handler')]).openingElement,
        'a',
        { settings: componentsSettings },
      ),
      [JSXAttributeMock('to', '/path'), JSXAttributeMock('href', '/path'), JSXAttributeMock('onClick', 'handler'), JSXAttributeMock('handleClick', 'handler')],
      'should map multiple attributes according to configuration',
    );

    st.end();
  });

  t.end();
});
