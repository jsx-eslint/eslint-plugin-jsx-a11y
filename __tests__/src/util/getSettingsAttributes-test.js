import test from 'tape';

import getSettingsAttributes from '../../../src/util/getSettingsAttributes';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';

test('getSettingsAttributes', (t) => {
  t.test('no settings in context', (st) => {
    st.deepEqual(
      getSettingsAttributes(JSXElementMock('a', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {}),
      [JSXAttributeMock('foo', 'path/to/page')],
      'returns existing attributes when no component settings exist',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {}),
      [JSXAttributeMock('foo', 'path/to/page')],
      'returns existing attributes when no component settings exist',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {
        'jsx-a11y': {},
      }),
      [JSXAttributeMock('foo', 'path/to/page')],
      'returns existing attributes when `components` is empty',
    );

    st.end();
  });

  t.test('with component settings mapping', (st) => {
    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {
        'jsx-a11y': {
          components: {
            Link: {
              component: 'a',
              attributes: {
                href: ['foo'],
              },
            },
          },
        },
      }),
      [JSXAttributeMock('href', 'path/to/page')],
      'returns the exisiting attributes and the mapped attributes',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('bar', 'path/to/page')]).openingElement, {
        'jsx-a11y': {
          components: {
            Link: {
              component: 'a',
              attributes: {
                href: ['foo', 'bar'],
              },
            },
          },
        },
      }),
      [JSXAttributeMock('href', 'path/to/page')],
      'returns the exisiting attributes and the mapped attributes',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('button', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {
        'jsx-a11y': {
          components: {
            Link: {
              component: 'a',
              attributes: {
                href: ['foo'],
              },
            },
          },
        },
      }),
      [JSXAttributeMock('foo', 'path/to/page')],
      'should return the existing attributes when no mapping exists',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('bar', 'path/to/page')]).openingElement, {
        'jsx-a11y': {
          components: {
            Link: {
              component: 'a',
              attributes: {
                href: ['foo'],
              },
            },
          },
        },
      }),
      [JSXAttributeMock('bar', 'path/to/page')],
      'returns the exisiting attributes when no mapping exists',
    );

    st.deepEqual(
      getSettingsAttributes(JSXElementMock('Link', [JSXAttributeMock('foo', 'path/to/page')]).openingElement, {
        settings: {
          'jsx-a11y': {
            components: {
              Link: 'a',
            },
          },
        },
      }),
      [JSXAttributeMock('foo', 'path/to/page')],
      'returns existing attributes when components mapping to the component does not have attributes',
    );

    st.end();
  });

  t.end();
});
