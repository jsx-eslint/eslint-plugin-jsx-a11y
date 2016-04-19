# href-no-hash

Enforce an anchor element's href prop value is not just #. You should use something more descriptive, or use a button instead.

## Rule details

This rule takes one optional argument of type string or an array of strings. These strings determine which JSX elements should be checked for the `href` prop **including** `a` by default. This is a good use case when you have a wrapper component that simply renders an `a` element (like in React):

```js
// Link.js
const Link = props => <a {...props}>A link</a>;

...

// NavBar.js (for example)
...
return (
  <nav>
    <Link href="/home" />
  </nav>
);
```

To tell this plugin to also check your `Link` element, specify this in your `.eslintrc` file:

```json
{
    "rules": {
        "jsx-a11y/href-no-hash": [ 2, "Link" ], // OR
        "jsx-a11y/href-no-hash": [ 2, [ "Link", "Anchor" ] ]
    }
}
```

### Succeed
```jsx
<a href="https://github.com" />
<a href="#section" />
<a href="foo" />
<a href={undefined} /> // This check will pass, but WTF?
```

### Fail
```jsx
<a href="#" />
<a href={"#"} />
<a href={`#`} />
```
