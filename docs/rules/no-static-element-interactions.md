# no-static-element-interactions

Enforce non-interactive DOM elements have no interactive handlers. Static elements such as `<div>` and `<span>` should not have mouse/keyboard event listeners. Instead use something more semantic, such as a button or a link.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<button onClick={() => {}} className="foo" />
<div className="foo" {...props} />
<input type="text" onClick={() => {}} />
```

### Fail
```jsx
<div onClick={() => {}} />
```
