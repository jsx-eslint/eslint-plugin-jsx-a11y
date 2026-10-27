# jsx-a11y/prefer-boolean-aria-values

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforce boolean literals over the strings `"true"` and `"false"` for ARIA states and properties that accept a boolean.

ARIA values are strings in HTML, and React renders `aria-hidden="true"`, `aria-hidden={true}` and `aria-hidden` as the same markup. This rule picks one form so a codebase doesn't flip-flop between them. It turns the string into a boolean literal; [`react/jsx-boolean-value`](https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md) then decides between `aria-hidden={true}` and `aria-hidden`.

The rule checks every ARIA attribute whose permitted values include `true` and `false`: boolean states such as `aria-hidden`, `aria-disabled` and `aria-expanded`, the tristates `aria-checked` and `aria-pressed`, and the tokens `aria-current`, `aria-haspopup` and `aria-invalid`. Other values, such as `aria-checked="mixed"` or `aria-current="page"`, stay strings.

The autofix replaces `"false"` with `{false}` and never removes the attribute: an absent `aria-expanded` means the element can't be expanded, while `aria-expanded={false}` means it is collapsed.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<span aria-hidden />
<span aria-hidden={true} />
<button aria-expanded={false} />
<button aria-expanded={open} />
<div role="checkbox" aria-checked="mixed" />
<a aria-current="page" />
<div aria-label="true" /> // aria-label is a string property.
```

### Fail
```jsx
<span aria-hidden="true" />
<button aria-expanded="false" />
<button aria-expanded={"false"} />
<div role="checkbox" aria-checked="true" />
<a aria-current="true" />
```

## When not to use it

This is a consistency rule, not an accessibility check: both forms produce the same accessibility tree. Leave it off if your codebase doesn't care which form it uses.

## Accessibility guidelines
General best practice (reference resources)

### Resources

- [WAI-ARIA 1.2: Value of states and properties](https://www.w3.org/TR/wai-aria-1.2/#propcharacteristic_value)
- [WAI-ARIA 1.2: true/false value type](https://www.w3.org/TR/wai-aria-1.2/#valuetype_true-false)
