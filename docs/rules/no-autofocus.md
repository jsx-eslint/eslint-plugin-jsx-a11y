# jsx-a11y/no-autofocus

💼 This rule is enabled in the following configs: ☑️ `recommended`, 🔒 `strict`.

<!-- end auto-generated rule header -->

Enforce that `autoFocus` prop is either not set at all on elements or is only set to `false`. Auto-focusing elements can cause usability issues for sighted and non-sighted users, alike.

## Rule options

This rule takes one optional object argument of type object:

```json
{
    "rules": {
        "jsx-a11y/no-autofocus": [ 2, {
            "ignoreNonDOM": true
        }],
    }
}
```

For the `ignoreNonDOM` option, this determines if developer created components are checked.

### Succeed
```jsx
<div />
<div autoFocus="false" />
```

### Fail
```jsx
<div autoFocus />
<div autoFocus="true" />
<div autoFocus={undefined} />
```

## Accessibility guidelines
General best practice (reference resources)

### Resources
- [WHATWG HTML Standard, The autofocus attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus)
- [The accessibility of HTML 5 autofocus](https://www.brucelawson.co.uk/2009/the-accessibility-of-html-5-autofocus/)
