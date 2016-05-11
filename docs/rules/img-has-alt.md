# img-has-alt

Enforce that an `img` element contains the `alt` prop. The `alt` attribute specifies an alternate text for an image, if the image cannot be displayed.

## Rule details

This rule takes one optional argument of type string or an array of strings. These strings determine which JSX elements should be checked for the `alt` prop **including** `img` by default. This is a good use case when you have a wrapper component that simply renders an `img` element (like in React):

```js
// Image.js
const Image = props => {
  const {
    alt,
    ...otherProps
  } = props;

  return (
    <img alt={alt} {...otherProps} />
  );
}

...

// Header.js (for example)
...
return (
  <header>
    <Image alt="Logo" src="logo.jpg" />
  </header>
);
```

To tell this plugin to also check your `Image` element, specify this in your `.eslintrc` file:

```json
{
    "rules": {
        "jsx-a11y/img-has-alt": [ 2, "Image" ], <!-- OR -->
        "jsx-a11y/img-has-alt": [ 2, [ "Image", "Avatar" ] ]
    }
}
```

Note that passing props as spread attribute without `alt` explicitly defined will cause this rule to fail. Explicitly pass down `alt` prop or use `role="presentation"` for rule to pass. Use `Image` component above as a reference for destructuring and applying the prop. **It is a good thing to explicitly pass props that you expect to be passed for self-documentation.** For example:
#### Bad
```jsx
function Foo(props) {
  return <img {...props} />
}
```

#### Good
```jsx
function Foo({ alt, ...props}) {
    return <img alt={alt} {...props} />
}

// OR

function Foo(props) {
    const {
        alt,
        ...otherProps
    } = props;

   return <img alt={alt} {...otherProps} />
}
```

### Succeed
```jsx
<img src="foo" alt="Foo eating a sandwich." />
<img src="foo" alt={"Foo eating a sandwich."} />
<img src="foo" alt={altText} />
<img src="foo" alt={`${person} smiling`} />
<img src="foo" alt="" />
<img src="foo" role="presentation" />
```

### Fail
```jsx
<img src="foo" />
<img {...props} />
<img {...props} alt /> // Has no value
<img {...props} alt={undefined} /> // Has no value
<img {...props} alt={`${undefined}`} /> // Has no value
```
