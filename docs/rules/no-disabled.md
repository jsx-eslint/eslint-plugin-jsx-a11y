# no-disabled

Enforce that `disabled` prop is not used on elements. Disabling interactive elements removes the element from the accessibility tree. Use `aria-disabled` instead.

## Rule details

This rule takes one optional object argument of type object:

```json
{
    "rules": {
        "jsx-a11y/no-disabled": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}
```

For the `ignoreNonDOM` option, this determines if developer created components are checked.

### Succeed
```jsx
<input />
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
