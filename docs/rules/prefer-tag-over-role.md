# jsx-a11y/prefer-tag-over-role

<!-- end auto-generated rule header -->

Enforces using semantic DOM elements over the ARIA `role` property.

Only DOM elements are checked; custom components are skipped unless the `components` setting maps them to a DOM element.

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<div>...</div>
<header>...</header>
<img alt="" src="image.jpg" />
```

### Fail

```jsx
<div role="checkbox">
<div role="img">
```

## Accessibility guidelines

- [WAI-ARIA Roles model](https://www.w3.org/TR/wai-aria-1.0/roles)

### Resources

- [MDN WAI-ARIA Roles](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles)
