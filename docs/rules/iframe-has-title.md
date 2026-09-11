# jsx-a11y/iframe-has-title

💼 This rule is enabled in the following configs: ☑️ `recommended`, 🔒 `strict`.

<!-- end auto-generated rule header -->

`<iframe>` elements must have an accessible name to indicate their content to the user.

The HTML `title` attribute is the most common way to provide that name. `aria-label` and `aria-labelledby` are also accepted, which is useful when a `title` tooltip is undesirable.

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<iframe title="This is a unique title" />
<iframe title={uniqueTitle} />
<iframe aria-label="This is a unique title" />
<iframe aria-labelledby="titleId" />
```

### Fail
```jsx
<iframe />
<iframe {...props} />
<iframe title="" />
<iframe title={''} />
<iframe title={``} />
<iframe title={undefined} />
<iframe title={false} />
<iframe title={true} />
<iframe title={42} />
<iframe aria-label="" />
<iframe aria-labelledby="" />
```

## Accessibility guidelines
- [WCAG 2.4.1](https://www.w3.org/WAI/WCAG21/Understanding/bypass-blocks)
- [WCAG 4.1.2](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value)

### Resources
- [axe-core, frame-title](https://dequeuniversity.com/rules/axe/3.2/frame-title)
