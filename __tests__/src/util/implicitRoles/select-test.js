import test from 'tape';

import JSXAttributeMock from '../../../../__mocks__/JSXAttributeMock';
import getImplicitRoleForSelect from '../../../../src/util/implicitRoles/select';

test('isAbstractRole', (t) => {
  t.test('works for combobox', (st) => {
    st.equal(
      getImplicitRoleForSelect([]),
      'combobox',
      'defaults to combobox',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', null)]),
      'combobox',
      'is combobox when multiple attribute is set to not be present',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', undefined)]),
      'combobox',
      'is combobox when multiple attribute is set to not be present',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', false)]),
      'combobox',
      'is combobox when multiple attribute is set to boolean false',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', '')]),
      'combobox',
      'is listbox when multiple attribute is falsey (empty string)',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '1')]),
      'combobox',
      'is combobox when size is not greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', 1)]),
      'combobox',
      'is combobox when size is not greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', 0)]),
      'combobox',
      'is combobox when size is not greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '0')]),
      'combobox',
      'is combobox when size is not greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '-1')]),
      'combobox',
      'is combobox when size is not greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '')]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', 'true')]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', true)]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', NaN)]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '')]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', undefined)]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', false)]),
      'combobox',
      'is combobox when size is a valid number',
    );

    st.end();
  });

  t.test('works for listbox based on multiple attribute', (st) => {
    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', true)]),
      'listbox',
      'is listbox when multiple is boolean true',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', 'multiple')]),
      'listbox',
      'is listbox when multiple is truthy (string)',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('multiple', 'true')]),
      'listbox',
      'is listbox when multiple is truthy (string) - React will warn about this',
    );

    st.end();
  });

  t.test('works for listbox based on size attribute', (st) => {
    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', 2)]),
      'listbox',
      'is listbox when size is greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', '3')]),
      'listbox',
      'is listbox when size is greater than 1',
    );

    st.equal(
      getImplicitRoleForSelect([JSXAttributeMock('size', 40)]),
      'listbox',
      'is listbox when size is greater than 1',
    );

    st.end();
  });

  t.end();
});
