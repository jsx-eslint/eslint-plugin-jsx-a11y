# interactive-supports-focus

Elements with an interactive role and interaction handlers (mouse or key press) must be focusable.

## How do I resolve this error?

### Case: This element is a stand-alone control like a button, a link or a form element

Add the `tabIndex` property to your component. A value of zero indicates that this element can be tabbed to.

```
<div
  role="button"
  tabIndex={0} />
```

-- or --

Replace the component with one that renders semantic html element like `<button>`, `<a href>` or `<input>` -- whichever fits your purpose.

Generally buttons, links and form elements should be reachable via tab key presses.
An element that can be tabbed to is said to be in the _tab ring_.

### Case: This element is part of a group of buttons, links, menu items, etc

One item in a group should have a tabindex of zero, the rest should have a tabindex of -1. A value of zero makes the element _tabbable_. A value of -1 makes the element _focusable_.

```
<div role="menu">
  <div role="menuitem" tabIndex="0">Open</div>
  <div role="menuitem" tabIndex="-1">Save</div>
  <div role="menuitem" tabIndex="-1">Close</div>
</div>
```

In the example above, the first item in the group can be tabbed to. The developer provides the ability to traverse to the subsequent items via the up/down/left/right arrow keys. Traversing via arrow keys is not provided by the browser or the assistive technology. See [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav) for information about established traversal behaviors for various UI widgets.

### Case: This element is not a button, link, menuitem, etc. It is catching bubbled events from elements that it contains

If your element is catching bubbled click or key events from descendant elements, then the proper role for this element is `presentation`.

```
<div
  onClick={onClickHandler}
  role="presentation">
  <button>Save</button>
</div>
```

Marking an element with the role `presentation` indicates to assistive technology that this element should be ignored; it exists to support the web application and is not meant for humans to interact with directly.

### References
  1. [AX_FOCUS_02](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules#ax_focus_02)
  1. [Mozilla Developer Network - ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)
  1. [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav)
  1. [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<!-- Good: div with onClick attribute is hidden from screen reader -->
<div aria-hidden onClick={() => void 0} />
<!-- Good: span with onClick attribute is in the tab order -->
<span onClick="doSomething();" tabIndex="0" role="button">Click me!</span>
<!-- Good: span with onClick attribute may be focused programmatically -->
<span onClick="doSomething();" tabIndex="-1" role="menuitem">Click me too!</span>
<!-- Good: anchor element with href is inherently focusable -->
<a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>
<!-- Good: buttons are inherently focusable -->
<button onClick="doSomething();">Click the button :)</button>
```

### Fail
```jsx
<!-- Bad: span with onClick attribute has no tabindex -->
<span onclick="submitForm();" role="button">Submit</span>
<!-- Bad: anchor element without href is not focusable -->
<a onclick="showNextPage();" role="button">Next page</a>
```
