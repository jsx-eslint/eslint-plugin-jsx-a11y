# onclick-has-role

Enforce visible, non-interactive elements with click handlers use role attribute. Visible means that it is not hidden from a screen reader. Examples of non-interactive elements are `div`, `section`, and `a` elements without a href prop. The purpose of the role attribute is to identify to screenreaders the exact function of an element.

#### References
1. [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div onClick={() => void 0} role="button" />
<input type="text" onClick={() => void 0} /> // Interactive element does not require role.
<a tabIndex="0" onClick={() => void 0} /> // tabIndex makes this interactive.
<button onClick={() => void 0} className="foo" /> // button is interactive.
<div onClick={() => void 0} role="button" aria-hidden /> // This is hidden from screenreader.
```

### Fail
```jsx
<div onClick={() => void 0} />
<div onClick={() => void 0} {...props} />
<div onClick={() => void 0} aria-hidden={false} />
<a onClick={() => void 0} />
```
