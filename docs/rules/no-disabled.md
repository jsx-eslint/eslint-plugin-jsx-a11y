# no-disabled

Rule that `disabled` prop should be cautioned on elements. Disabling interactive elements removes the element from the accessibility tree. Consider using `aria-disabled`.

## Rule details
The general consensus is that `disabled` should be used with specific intent. It goes against intuition since `disabled` is a native HTML attribute, which disables. However, from a usability stand-point it is not a good UX for screen readers: It removes the element from the a11y tree, and may omit critical information. It is best to use `aria-disabled` and add the additional JS logic to "disable" the element.

### Succeed
```jsx
<div />
<div disabled />
<input />
<select />
<textarea />
<button />
```

### Fail
```jsx
<input disabled />
<input disabled="true" />
<input disabled="false" />
<input disabled={undefined} />
```

### Resources
- [MDN aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
- [W3 KBD Disabled Controls](https://www.w3.org/TR/wai-aria-practices/#kbd_disabled_controls)
