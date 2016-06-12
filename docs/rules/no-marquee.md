# no-marquee

Enforces that no `<marquee>` elements are used.

#### References
1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/marquee)

## Rule details

This rule takes no arguments. You may have custom JSX components named `Marquee`, as this rule only checks for the DOM level `marquee`.

### Succeed
```jsx
<div />
<Marquee />
```

### Fail
```jsx
<marquee />
```
