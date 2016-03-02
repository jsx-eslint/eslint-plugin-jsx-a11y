# no-hash-href

Enforce an anchor element's href prop value is not just #. You should use something more descriptive, or use a button instead.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<a href="https://github.com" />
<a href="#section" />
<a href="foo" />
```

### Fail
```jsx
<a href="#" />
<a href={"#"} />
<a href={`#`} />
```