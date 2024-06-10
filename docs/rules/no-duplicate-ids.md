# jsx-a11y/no-duplicate-ids

💼 This rule is enabled in the following configs: ☑️ `recommended`, 🔒 `strict`.

<!-- end auto-generated rule header -->

Enforces that no `id` attributes are reused. This rule does a basic check to ensure that `id` attribute values are not the same. In the case of a JSX expression, it checks that no `id` attributes reuse the same expression.

## Rule details

This rule takes no arguments.

### Succeed

```jsx
<div id="chris"></div><div id="chris2"></div>
<div id={chris}></div><div id={chris2}></div>
<MyComponent id="chris" /><MyComponent id="chris2" />
<div id="chris"></div><MyComponent id={chris} />
```

### Fail

```jsx
<div id="chris"></div><div id="chris"></div>
<div id={chris}></div><div id={chris}></div>
<MyComponent id="chris" /><MyComponent id="chris" />
<MyComponent id={chris} /><div id={chris}></div>
```

## Accessibility guidelines
- [WCAG 4.1.1](https://www.w3.org/WAI/WCAG21/Understanding/parsing.html)
