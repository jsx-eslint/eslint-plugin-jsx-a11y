import test from 'tape';

import getChildComponent from '../../../src/util/getChildComponent';
import JSXAttributeMock from '../../../__mocks__/JSXAttributeMock';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXExpressionContainerMock from '../../../__mocks__/JSXExpressionContainerMock';

test('mayContainChildComponent', (t) => {
  t.equal(
    getChildComponent(
      JSXElementMock('div', [], [
        JSXElementMock('div', [], [
          JSXElementMock('span', [], []),
          JSXElementMock('span', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
            ]),
          ]),
        ]),
        JSXElementMock('span', [], []),
        JSXElementMock('img', [
          JSXAttributeMock('src', 'some/path'),
        ]),
      ]),
      'FancyComponent',
      5,
    ),
    undefined,
    'no FancyComponent returns undefined',
  );

  t.test('contains an indicated component', (st) => {
    const inputMock = JSXElementMock('input');
    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          inputMock,
        ]),
        'input',
      ),
      inputMock,
      'returns input',
    );

    const FancyComponentMock = JSXElementMock('FancyComponent');
    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          FancyComponentMock,
        ]),
        'FancyComponent',
      ),
      FancyComponentMock,
      'returns FancyComponent',
    );

    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('FancyComponent'),
          ]),
        ]),
        'FancyComponent',
      ),
      undefined,
      'FancyComponent is outside of default depth, should return undefined',
    );

    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            FancyComponentMock,
          ]),
        ]),
        'FancyComponent',
        2,
      ),
      FancyComponentMock,
      'FancyComponent is inside of custom depth, should return FancyComponent',
    );

    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('div', [], [
            JSXElementMock('span', [], []),
            JSXElementMock('span', [], [
              JSXElementMock('span', [], []),
              JSXElementMock('span', [], [
                JSXElementMock('span', [], [
                  JSXElementMock('span', [], [
                    FancyComponentMock,
                  ]),
                ]),
              ]),
            ]),
          ]),
          JSXElementMock('span', [], []),
          JSXElementMock('img', [
            JSXAttributeMock('src', 'some/path'),
          ]),
        ]),
        'FancyComponent',
        6,
      ),
      FancyComponentMock,
      'deep nesting, returns FancyComponent',
    );

    st.end();
  });

  const MysteryBox = JSXExpressionContainerMock('mysteryBox');
  t.equal(
    getChildComponent(
      JSXElementMock('div', [], [
        MysteryBox,
      ]),
      'FancyComponent',
    ),
    MysteryBox,
    'Indeterminate situations + expression container children - returns component',
  );

  t.test('Glob name matching - component name contains question mark ? - match any single character', (st) => {
    const FancyComponentMock = JSXElementMock('FancyComponent');
    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          FancyComponentMock,
        ]),
        'Fanc?Co??onent',
      ),
      FancyComponentMock,
      'returns component',
    );

    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('FancyComponent'),
        ]),
        'FancyComponent?',
      ),
      undefined,
      'returns undefined',
    );

    st.test('component name contains asterisk * - match zero or more characters', (s2t) => {
      s2t.equal(
        getChildComponent(
          JSXElementMock('div', [], [
            FancyComponentMock,
          ]),
          'Fancy*',
        ),
        FancyComponentMock,
        'returns component',
      );

      s2t.equal(
        getChildComponent(
          JSXElementMock('div', [], [
            FancyComponentMock,
          ]),
          '*Component',
        ),
        FancyComponentMock,
        'returns component',
      );

      s2t.equal(
        getChildComponent(
          JSXElementMock('div', [], [
            FancyComponentMock,
          ]),
          'Fancy*C*t',
        ),
        FancyComponentMock,
        'returns component',
      );

      s2t.end();
    });

    st.end();
  });

  t.test('using a custom elementType function', (st) => {
    const CustomInputMock = JSXElementMock('CustomInput');
    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          CustomInputMock,
        ]),
        'input',
        2,
        () => 'input',
      ),
      CustomInputMock,
      'returns the component when the custom elementType returns the proper name',
    );

    st.equal(
      getChildComponent(
        JSXElementMock('div', [], [
          JSXElementMock('CustomInput'),
        ]),
        'input',
        2,
        () => 'button',
      ),
      undefined,
      'returns undefined when the custom elementType returns a wrong name',
    );

    st.end();
  });

  t.end();
});
