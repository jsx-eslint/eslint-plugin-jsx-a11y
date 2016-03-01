# use-label-for

Enforce label tags have htmlFor attribute. Form controls using a label to identify them must have only one label that is programmatically associated with the control using: label htmlFor=[ID of control].

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<input type="text" id="firstName" />
<label htmlFor="firstName">First Name</label>
```

### Fail
```jsx
<input type="text" id="firstName" />
<label>First Name</label>
```