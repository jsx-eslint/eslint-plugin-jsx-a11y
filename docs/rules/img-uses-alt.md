# img-uses-alt

Enforce that an `img` element contains the `alt` prop. The alt attribute specifies an alternate text for an image, if the image cannot be displayed.

## Rule details

This rule takes no arguments. However, note that passing props as spread attribute without alt explicitly defined will cause this rule to fail. Explicitly pass down alt prop for rule to pass. Alt must have an actual value to pass.

### Succeed
```jsx
<img src="foo" alt="Foo eating a sandwich." />
<img src="foo" alt={"Foo eating a sandwich."} />
<img src="foo" alt={altText} />
<img src="foo" alt={`${person} smiling`} />
```

### Fail
```jsx
<img src="foo" />
<img {...props} />
<img {...props} alt /> // Has no value
<img {...props} alt={undefined} /> // Has no value
<img {...props} alt={`${undefined}`} /> // Has no value
```
