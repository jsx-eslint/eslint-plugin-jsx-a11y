# no-disabled

Rule that `disabled` prop should be cautioned on elements. Disabling interactive elements removes the element from the accessibility tree. Consider using `aria-disabled`.

## Rule details

Warns usage of `disabled` property.

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

## Accessibility guidelines
General best practice (reference resources)

### Resources
- [MDN aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
- [W3 KBD Disabled Controls](https://www.w3.org/TR/wai-aria-practices/#kbd_disabled_controls)
