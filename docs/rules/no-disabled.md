# no-disabled

Enforce that disabled prop is not used on elements. Disabling inputs remove the input from the accessibility tree and loses context. Use `aria-disabled` instead.

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
<div />
```

### Fail
```jsx
<div disabled />
<div disabled="true" />
<div disabled="false" />
<div disabled={undefined} />
```

## Accessibility guidelines
General best practice (reference resources)

### Resources
- [MDN aria-disabled](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-disabled)
