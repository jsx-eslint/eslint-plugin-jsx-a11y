import test from 'tape';

import getParentElement from '../../../src/util/getParentElement';
import JSXElementMock from '../../../__mocks__/JSXElementMock';
import JSXFragmentMock from '../../../__mocks__/JSXFragmentMock';

test('getParentElement', (t) => {
  const MockElement = JSXElementMock('input', [], []);

  t.test('new context api', (st) => {
    st.test('no parent', (st2) => {
      const mockContext = {
        sourceCode: {
          getAncestors: () => [],
        },
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        undefined,
        'no parent -> returns undefined',
      );

      st2.end();
    });

    st.test('one parent element', (st2) => {
      const MockParentElement = JSXElementMock('div', [], [MockElement]);

      const mockContext = {
        sourceCode: {
          getAncestors: () => [MockParentElement],
        },
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentElement,
        'one parent JSXElement -> returns parent',
      );

      st2.end();
    });

    st.test('one parent fragment', (st2) => {
      const MockParentFragment = JSXFragmentMock([MockElement]);

      const mockContext = {
        sourceCode: {
          getAncestors: () => [MockParentFragment],
        },
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentFragment,
        'one parent JSXFragment -> returns parent',
      );

      st2.end();
    });

    st.test('multiple ancestors', (st2) => {
      const MockParentElement = JSXElementMock('div', [], [MockElement]);
      const MockUncleElement = JSXElementMock('div', [], []);
      const MockGrandparentFragment = JSXFragmentMock([MockParentElement, MockUncleElement]);

      const mockContext = {
        sourceCode: {
          getAncestors: () => [MockGrandparentFragment, MockParentElement],
        },
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentElement,
        'multiple ancestors -> returns direct parent',
      );

      st2.end();
    });

    st.end();
  });

  t.test('legacy context', (st) => {
    st.test('no parent', (st2) => {
      const mockContext = {
        getAncestors: () => [],
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        undefined,
        'no parent -> returns undefined',
      );

      st2.end();
    });

    st.test('one parent element', (st2) => {
      const MockParentElement = JSXElementMock('div', [], [MockElement]);

      const mockContext = {
        getAncestors: () => [MockParentElement],
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentElement,
        'one parent JSXElement -> returns parent',
      );

      st2.end();
    });

    st.test('one parent fragment', (st2) => {
      const MockParentFragment = JSXFragmentMock([MockElement]);

      const mockContext = {
        getAncestors: () => [MockParentFragment],
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentFragment,
        'one parent JSXFragment -> returns parent',
      );

      st2.end();
    });

    st.test('multiple ancestors', (st2) => {
      const MockParentElement = JSXElementMock('div', [], [MockElement]);
      const MockUncleElement = JSXElementMock('div', [], []);
      const MockGrandparentFragment = JSXFragmentMock([MockParentElement, MockUncleElement]);

      const mockContext = {
        getAncestors: () => [MockGrandparentFragment, MockParentElement],
      };

      st2.equal(
        getParentElement(
          MockElement,
          mockContext,
        ),
        MockParentElement,
        'multiple ancestors -> returns direct parent',
      );

      st2.end();
    });

    st.end();
  });
});
