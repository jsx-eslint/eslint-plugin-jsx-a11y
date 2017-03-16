# no-noninteractive-element-handlers

Non-interactive HTML elements and non-interactive ARIA roles indicate _content_ and _containers_ in the user interface. A non-interactive element does not support event handlers (mouse and key handlers). Non-interactive elements include `<main>`, `<area>`, `<h1>` (,`<h2>`, etc), `<img>`, `<li>`, `<ul>` and `<ol>`. Non-interactive [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro) include `article`, `banner`, `complementary`, `img`, `listitem`, `main`, `region` and `tooltip`.

## How do I resolve this error?

### Case: This element acts like a button, link, menuitem, etc.

Move the event handler function to an inner element that is either a semantically interactive element (`<button>`, `<a href>`) or that has an interactive role. This leaves the _content_ or _container_ semantic value of this element intact.

Common interactive roles include:

  1. `button`
  1. `link`
  1. `checkbox`
  1. `menuitem`
  1. `menuitemcheckbox`
  1. `menuitemradio`
  1. `option`
  1. `radio`
  1. `searchbox`
  1. `switch`
  1. `textbox`

Note: Adding a role to your element does **not** add behavior. When a semantic HTML element like `<button>` is used, then it will also respond to Enter key presses when it has focus. The developer is responsible for providing the expected behavior of an element that the role suggests it would have: focusability and key press support.
see [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex).

### Case: This element is catching bubbled events from elements that it contains

Move the event handler function to an inner element like `<div>` and give that element a role of `presentation`. This leaves the _content_ or _container_ semantic value of this element intact.

```
<div role="article">
  <div
    onClick="onClickHandler"
    onKeyPress={onKeyPressHandler}
    role="presentation">
    {this.props.children}
  </div>
</div>
```

Marking an element with the role `presentation` indicates to assistive technology that this element should be ignored; it exists to support the web application and is not meant for humans to interact with directly.

### References

  1. [WAI-ARIA roles](https://www.w3.org/TR/wai-aria-1.1/#usage_intro)
  1. [WAI-ARIA Authoring Practices Guide - Design Patterns and Widgets](https://www.w3.org/TR/wai-aria-practices-1.1/#aria_ex)
  1. [Fundamental Keyboard Navigation Conventions](https://www.w3.org/TR/wai-aria-practices-1.1/#kbd_generalnav)
  1. [Mozilla Developer Network - ARIA Techniques](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_button_role#Keyboard_and_focus)

## Rule details

This rule takes no arguments.

### Succeed
```jsx
<div onClick={() => void 0} role="button" />
<div onClick={() => void 0} role="presentation" />
<input type="text" onClick={() => void 0} /> // Interactive element does not require role.
<button onClick={() => void 0} className="foo" /> // button is interactive.
<div onClick={() => void 0} role="button" aria-hidden /> // This is hidden from screenreader.
<Input onClick={() => void 0} type="hidden" /> // This is a higher-level DOM component
```

### Fail
```jsx
<li onClick={() => void 0} />
<div onClick={() => void 0} role="listitem" />
```
