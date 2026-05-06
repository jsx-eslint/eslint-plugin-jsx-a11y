# jsx-a11y/lang

<!-- end auto-generated rule header -->

The `lang` prop on the `<html>` element must be a valid IETF's BCP 47 language tag.
And also, `<html>` elements must have the `lang` prop.

## Rule details

This rule takes no arguments.

## Rule options

This rule takes one optional boolean that determines whether to check for the `lang` prop on `<html>` elements. It defaults to `false`:

```json
{
    "rules": {
        "jsx-a11y/lang": [2, {
            "htmlHasLang": true
        }]
    }
}
```

### Succeed

```jsx
<html lang="en">
<html lang="en-US">
<html lang={lang}>
```

### Fail

```jsx
<html lang="foo">
<html> // if htmlHasLang is true
```

## Accessibility guidelines
- [WCAG 3.1.1](https://www.w3.org/WAI/WCAG21/Understanding/language-of-page)

### Resources
- [axe-core, valid-lang](https://dequeuniversity.com/rules/axe/3.2/valid-lang)
- [Language tags in HTML and XML](https://www.w3.org/International/articles/language-tags/)
- [IANA Language Subtag Registry](https://www.iana.org/assignments/language-subtag-registry/language-subtag-registry)
