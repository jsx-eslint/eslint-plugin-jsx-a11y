/* eslint-env jest */
/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import parserOptionsMapper from '../../__util__/parserOptionsMapper';
import rule from '../../../src/rules/interactive-supports-focus';

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'Elements with interactive roles must be focusable.',
  type: 'JSXOpeningElement',
};

ruleTester.run('interactive-supports-focus', rule, {
  valid: [
    { code: '<div />' },
    { code: '<div aria-hidden onClick={() => void 0} />' },
    { code: '<div aria-hidden={true == true} onClick={() => void 0} />' },
    { code: '<div aria-hidden={true === true} onClick={() => void 0} />' },
    { code: '<div aria-hidden={hidden !== false} onClick={() => void 0} />' },
    { code: '<div aria-hidden={hidden != false} onClick={() => void 0} />' },
    { code: '<div aria-hidden={1 < 2} onClick={() => void 0} />' },
    { code: '<div aria-hidden={1 <= 2} onClick={() => void 0} />' },
    { code: '<div aria-hidden={2 > 1} onClick={() => void 0} />' },
    { code: '<div aria-hidden={2 >= 1} onClick={() => void 0} />' },
    { code: '<div onClick={() => void 0} />;' },
    { code: '<div onClick={() => void 0} tabIndex={undefined} />;' },
    { code: '<div onClick={() => void 0} tabIndex="bad" />;' },
    { code: '<div onClick={() => void 0} role={undefined} />;' },
    { code: '<div role="section" onClick={() => void 0} />' },
    { code: '<div onClick={() => void 0} aria-hidden={false} />;' },
    { code: '<div onClick={() => void 0} {...props} />;' },
    { code: '<input type="text" onClick={() => void 0} />' },
    { code: '<input type="hidden" onClick={() => void 0} tabIndex="-1" />' },
    { code: '<input type="hidden" onClick={() => void 0} tabIndex={-1} />' },
    { code: '<input onClick={() => void 0} />' },
    { code: '<input onClick={() => void 0} role="combobox" />' },
    { code: '<button onClick={() => void 0} className="foo" />' },
    { code: '<option onClick={() => void 0} className="foo" />' },
    { code: '<select onClick={() => void 0} className="foo" />' },
    { code: '<area href="#" onClick={() => void 0} className="foo" />' },
    { code: '<area onClick={() => void 0} className="foo" />' },
    { code: '<textarea onClick={() => void 0} className="foo" />' },
    { code: '<a onClick="showNextPage();">Next page</a>' },
    { code: '<a onClick="showNextPage();" tabIndex={undefined}>Next page</a>' },
    { code: '<a onClick="showNextPage();" tabIndex="bad">Next page</a>' },
    { code: '<a onClick={() => void 0} />' },
    { code: '<a tabIndex="0" onClick={() => void 0} />' },
    { code: '<a tabIndex={dynamicTabIndex} onClick={() => void 0} />' },
    { code: '<a tabIndex={0} onClick={() => void 0} />' },
    { code: '<a role="button" href="#" onClick={() => void 0} />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex={0} />' },
    { code: '<a onClick={() => void 0} href="http://x.y.z" role="button" />' },
    { code: '<TestComponent onClick={doFoo} />' },
    { code: '<input onClick={() => void 0} type="hidden" />;' },
    { code: '<span onClick="submitForm();">Submit</span>', errors: [expectedError] },
    { code: '<span onClick="submitForm();" tabIndex={undefined}>Submit</span>' },
    { code: '<span onClick="submitForm();" tabIndex="bad">Submit</span>' },
    { code: '<span onClick="doSomething();" tabIndex="0">Click me!</span>' },
    { code: '<span onClick="doSomething();" tabIndex={0}>Click me!</span>' },
    { code: '<span onClick="doSomething();" tabIndex="-1">Click me too!</span>' },
    {
      code: '<a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>',
    },
    { code: '<section onClick={() => void 0} />;' },
    { code: '<main onClick={() => void 0} />;' },
    { code: '<article onClick={() => void 0} />;' },
    { code: '<header onClick={() => void 0} />;' },
    { code: '<footer onClick={() => void 0} />;' },
    { code: '<div role="button" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="checkbox" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="link" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="menuitem" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="menuitemcheckbox" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="menuitemradio" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="option" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="radio" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="spinbutton" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="switch" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="tab" tabIndex="0" onClick={() => void 0} />' },
    { code: '<div role="textbox" tabIndex="0" onClick={() => void 0} />' },
    { code: '<Foo.Bar onClick={() => void 0} aria-hidden={false} />;' },
    { code: '<Input onClick={() => void 0} type="hidden" />;' },
  ].map(parserOptionsMapper),

  invalid: [
    // onClick
    { code: '<span role="button" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<a role="button" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="button" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="checkbox" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="link" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="gridcell" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitem" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitemcheckbox" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitemradio" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="option" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="radio" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="searchbox" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="slider" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="spinbutton" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="switch" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="tab" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="textbox" onClick={() => void 0} />', errors: [expectedError] },
    { code: '<div role="treeitem" onClick={() => void 0} />', errors: [expectedError] },
    // onKeyPress
    { code: '<span role="button" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<a role="button" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="button" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="checkbox" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="link" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="gridcell" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitem" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitemcheckbox" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="menuitemradio" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="option" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="radio" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="searchbox" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="slider" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="spinbutton" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="switch" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="tab" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="textbox" onKeyPress={() => void 0} />', errors: [expectedError] },
    { code: '<div role="treeitem" onKeyPress={() => void 0} />', errors: [expectedError] },
    // Other interactive handlers
    { code: '<div role="button" onKeyDown={() => void 0} />', errors: [expectedError] },
    { code: '<div role="button" onKeyUp={() => void 0} />', errors: [expectedError] },
    { code: '<div role="button" onMouseDown={() => void 0} />', errors: [expectedError] },
    { code: '<div role="button" onMouseUp={() => void 0} />', errors: [expectedError] },
  ].map(parserOptionsMapper),
});
