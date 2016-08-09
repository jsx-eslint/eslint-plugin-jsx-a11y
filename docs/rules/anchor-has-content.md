# anchor-has-content

Enforce that anchors have content and that the content is accessible to screen readers. Accessible means that it is not hidden using the `aria-hidden` prop. Refer to the references to learn about why this is important.

#### References
1. [Deque University](https://dequeuniversity.com/rules/axe/1.1/link-name)

## Rule details

This rule takes one optional argument of type string or array of strings. These strings determine which JSX elements should be checked including `a` and `Link` (react-router) by default. This is a good use case when you have a wrapper component that simply renders a anchor element (like in React):

```js
// Anchor.js
const Anchor = props => {
  return (
    <a {...props}>{ props.children }</a>
  );
}

...

// CreateAccount.js (for example)
...
return (
  <Anchor>Create Account</Anchor>
);
```

To tell this plugin to also check your `Anchor` element, specify this in your `.eslintrc` file:

```json
{
    "rules": {
        "jsx-a11y/anchor-has-content": [ 2, "Anchor" ], // OR
        "jsx-a11y/anchor-has-content": [ 2, [ "AnchorOne", "AnchorTwo" ] ]
    }
}
```


### Succeed
```jsx
<a>Anchor Content!</a>
<a><TextWrapper /><a>
<a dangerouslySetInnerHTML={{ __html: 'foo' }} />
```

### Fail
```jsx
<a />
<a><TextWrapper aria-hidden />
```
