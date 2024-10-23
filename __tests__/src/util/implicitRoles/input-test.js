import test from 'tape';

import JSXAttributeMock from '../../../../__mocks__/JSXAttributeMock';
import getImplicitRoleForInput from '../../../../src/util/implicitRoles/input';

test('isAbstractRole', (t) => {
  t.test('works for inputs with no corresponding role', (st) => {
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'color')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'date')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'datetime-local')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'file')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'hidden')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'month')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'password')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'time')]),
      '',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'week')]),
      '',
    );

    st.end();
  });

  t.test('works for buttons', (st) => {
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'button')]),
      'button',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'image')]),
      'button',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'reset')]),
      'button',
    );

    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'submit')]),
      'button',
    );

    st.end();
  });

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', 'checkbox')]),
    'checkbox',
    'works for checkboxes',
  );

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', 'radio')]),
    'radio',
    'works for radios',
  );

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', 'range')]),
    'slider',
    'works for ranges',
  );

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', 'number')]),
    'spinbutton',
    'works for number inputs',
  );

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', 'search')]),
    'searchbox',
    'works for search inputs',
  );

  t.test('works for textboxes', (st) => {
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'email')]),
      'textbox',
    );
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'text')]),
      'textbox',
    );
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'tel')]),
      'textbox',
    );
    st.equal(
      getImplicitRoleForInput([JSXAttributeMock('type', 'url')]),
      'textbox',
    );

    st.end();
  });

  t.test('works for inputs with list attribute', (st) => {
    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('type', 'search'),
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('type', 'email'),
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('type', 'tel'),
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('type', 'url'),
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('type', 'invalid'),
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.equal(
      getImplicitRoleForInput([
        JSXAttributeMock('list', 'example'),
      ]),
      'combobox',
    );

    st.end();
  });

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', '')]),
    'textbox',
    'works for the default case',
  );

  t.equal(
    getImplicitRoleForInput([JSXAttributeMock('type', true)]),
    'textbox',
    'works for the true case',
  );

  t.end();
});
