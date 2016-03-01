# use-onblur-not-onchange

Enforce usage of onBlur over onChange for accessibility. onBlur must be used instead of onChange, unless absolutely necessary and it causes no negative consequences for keyboard only or screen reader users.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<input onBlur={updateModel} />
<input onBlur={handleOnBlur} onChange={handleOnChange} />
```

### Fail
```jsx
<input onChange={updateModel} />
```