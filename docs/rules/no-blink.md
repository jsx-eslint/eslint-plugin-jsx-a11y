# no-blink

Enforces that no `<blink>` elements are used. This element is deprecated and can cause visual accessibility issues.

#### References
1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/blink)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div />
```

### Fail
```jsx
<blink />
```
