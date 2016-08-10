# img-redundant-alt

Enforce img alt attribute does not contain the word image, picture, or photo. Screenreaders already announce `img` elements as an image. There is no need to use words such as *image*, *photo*, and/or *picture*.

## Rule details
This rule takes one optional argument of type string or array of strings. These strings can be used to specify custom words that should be checked for in the alt prop. Useful for specifying words in other languages.

The rule will first check if `aria-hidden` is true to determine whether to enforce the rule. If the image is hidden, then rule will always succeed.

To tell this plugin to also check for custom words , specify this in your `.eslintrc` file:

```json
{
    "rules": {
        "jsx-a11y/img-redundant-alt": [ 2, "Bild" ], // OR
        "jsx-a11y/img-redundant-alt": [ 2, [ "Bild", "Foto" ] ]
    }
}
```

### Succeed
```jsx
<img src="foo" alt="Foo eating a sandwich." />
<img src="bar" aria-hidden alt="Picture of me taking a photo of an image" /> // Will pass because it is hidden.
<img src="baz" alt={`Baz taking a ${photo}`} /> // This is valid since photo is a variable name.
```

### Fail
```jsx
<img src="foo" alt="Photo of foo being weird." />
<img src="bar" alt="Image of me at a bar!" />
<img src="baz" alt="Picture of baz fixing a bug." />
```
