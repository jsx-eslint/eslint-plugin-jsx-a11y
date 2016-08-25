# click-events-have-key-events

Enforce `onclick` is accompanied by at least one of the following: `onkeyup`, `onkeydown`, `onkeypress`. Coding for the keyboard is important for users with physical disabilities who cannot use a mouse, AT compatibility, and screenreader users.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div onClick={() => void 0} onKeyDown={_handleKeyDown}/>
<div onClick={() => void 0} onKeyUp={_handleKeyUp} />
<div onClick={() => void 0} onKeyPress={_handleKeyPress} />
```

### Fail
```jsx
<div onClick={() => void 0} />
```
