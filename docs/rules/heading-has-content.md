# heading-has-content

Enforce that heading elements (`h1`, `h2`, etc.) have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

#### References
1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/empty-heading)

## Rule details

This rule takes one optional argument of type string or array of strings. These strings determine which JSX elements should be checked including `h1`, `h2`, `h3`, `h4`, `h5`, and `h6` by default. This is a good use case when you have a wrapper component that simply renders a heading element (like in React):

```js
// Header.js
const Header = props => {
  return (
    <h1 {...props}>{ props.children }</h1>
  );
}

...

// CreateAccount.js (for example)
...
return (
  <Header>Create Account</Header>
);
```

To tell this plugin to also check your `Header` element, specify this in your `.eslintrc` file:

```json
{
    "rules": {
        "jsx-a11y/heading-has-content": [ 2, "Header" ], // OR
        "jsx-a11y/heading-has-content": [ 2, [ "HeaderOne", "HeaderTwo" ] ]
    }
}
```


#### Bad
```jsx
function Foo(props) {
  return <label {...props} />
}
```

### Succeed
```jsx
<h1>Heading Content!</h1>
<h1><TextWrapper /><h1>
<h1 dangerouslySetInnerHTML={{ __html: 'foo' }} />
```

### Fail
```jsx
<h1 />
<h1><TextWrapper aria-hidden />
```
