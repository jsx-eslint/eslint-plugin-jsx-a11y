# autocomplete-valid

Ensure the autocomplete attribute is correct and suitable for the form field it is used with.

#### References
1. [axe-core, autocomplete-valid](https://dequeuniversity.com/rules/axe/3.2/autocomplete-valid)
2. [HTML 5.2, Autocomplete requirements](https://www.w3.org/TR/html52/sec-forms.html#autofilling-form-controls-the-autocomplete-attribute)

## Rule details

This rule takes one optional object argument of type object:

```
{
    "rules": {
        "jsx-a11y/autocomplete-valid": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}
```

### Succeed
```jsx
<!-- Good: the autocomplete attribute is used according to the HTML specification -->
<input type="text" autocomplete="name" />

<!-- Good: ignoreNonDOM is set to true -->
<MyInput autocomplete="incorrect" /> 
```

### Fail
```jsx
<!-- Bad: the autocomplete attribute has an invalid value -->
<input type="text" autocomplete="incorrect" />

<!-- Bad: the autocomplete attribute is on an inappropriate input element -->
<input type="email" autocomplete="url" />

<!-- Bad: ignoreNonDOM is undefined or set to false -->
<MyInput autocomplete="incorrect" /> 
```