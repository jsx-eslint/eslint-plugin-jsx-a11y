# alt-text-max-length

Enforces that any image `alt` text with a static value is no longer than a maximum length.

Although screenreaders can read long image alt text, long descriptions -typically after 100-150 characters- are likely too verbose for the image.
Best practice is generally to move the description to another, linked element on the page.

## Rule details

This rule takes one optional object argument of type object:

```json
{
  "rules": {
    "jsx-a11y/alt-text": [
      2,
      {
        "maximumLength": 125
      }
    ]
  }
}
```

The `maximumLength` option is a custom maximum length for alt text.
It defaults to `125`

### Succeed

```jsx
<img alt="" src="image.jpg" />
<img alt="short description of the image" src="image.jpg" />
```

### Fail

```jsx
<img
  alt="a very long description ... that exceeds 125 characters"
  src="image.jpg"
/>
```

## Accessibility guidelines

- [WCAG 1.1.1](https://www.w3.org/TR/UNDERSTANDING-WCAG20/text-equiv-all.html)

### Resources

- [Provide Long Descriptions for Complex Images](https://dequeuniversity.com/tips/long-descriptions)
