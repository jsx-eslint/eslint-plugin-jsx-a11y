# div-has-apply

Enforcing the use of tabindex="0" role="button" attributes when a call to action verb is used in a `div` element. Furthermore, recommendation is made to use button native HTML element over the ARIA attributes following the first rule of ARIA.

### References

  1. eslint-plugin-jsx-a11y/docs/rule/heading-has-content

## Rule details

Here are the list of call to action(CTA) verbs that the rule will recognise and
indicate the line of code incorrect if one of them is in between `<div>` `</ div>` elements:
  'advise', 'amplify', 'apply', 'arrange', 'ask',
  'boost', 'build',
  'call', 'click', 'close', 'commit', 'consult', 'compile', 'collect', 'contribute', 'create', 'cut',
  'decrease', 'delete', 'divide', 'drink',
  'eat', 'earn', 'enable', 'enter', 'execute', 'exit', 'expand', 'explain',
  'finish', 'forecast', 'fix',
  'generate',
  'handle', 'help', 'hire', 'hit',
  'improve', 'increase',
  'join', 'jump',
  'leave', 'let\'/s', 'list', 'listen',
  'magnify', 'make', 'manage', 'minimize', 'move',
  'ok', 'open', 'organise', 'oversee',
  'play', 'push',
  'read', 'reduce', 'run',
  'save', 'send', 'shout', 'sing', 'submit', 'support',
  'talk', 'trim',
  'visit', 'volunteer', 'vote',
  'watch', 'win', 'write',

This rule takes one optional object argument of type object:

```json
{
    "rules": {
        "jsx-a11y/heading-has-content": [ 2, {
            "components": [ "Apply" ],
          }],
    }
}
```
For the `components` option, these strings determine which JSX elements (**always including** `<div>`) should be checked for having call to action verbs content. This is a good use case when you have a wrapper component that simply renders a `button` element (like in React):


```js
// Apply.js
const Apply = props => {
  return (
    <div tabindex="0" role="button" {...props}>{ props.children }</div>
  );
}

...

// CreateForm.js (for example)
...
return (
  <Apply>Apply</Apply>
);
```

### Succeed
```jsx
<div />
<div></div> // empty div is allowed
<div>orange</div> // no action word within div element
<div tabIndex="0" role="button">orange</div> // any word within div that has the two attributes
<div tabIndex="0" role="button">advise</div> // any of the action words e.g.: advise within div that has the two attributes
<Apply tabIndex="0" role="button">advise</Apply> // If custom element is an action word then the text within it should also be an action word.
```

### Fail
```jsx
// when a call to action verb is between div elements:

//both attributes are missing and/or wrong
<div>submit</div> // both attributes are missing
<div tabIndex role>apply</div> // both attributes are undefined
<div tabIndex="-1" role="navigation">apply</div> // both attributes values are wrong
<div tabIndex="1" role="main">apply</div> // both attributes values are wrong
<div role="contentinfo">apply</div> // wrong attribute value and missing attribute
<div tabindex="-1">apply</div> // wrong attribute value and missing attribute

// tabindex is missing or wrong
<div role="button">apply</div>
<div role="button" tabindex>apply</div>
<div role="button" tabindex="">apply</div>
<div role="button" tabindex="-1">apply</div>
<div role="button" tabindex="1">apply</div>

// role is missing or wrong
<div tabIndex="0">apply</div>
<div tabIndex="0" role>apply</div>
<div tabIndex="0" role="">apply</div>
<div tabIndex="0" role="main">apply</div>
<div tabIndex="0" role="main">apply</div>

// custom element name is an action verb and the text in between too
<Appy>apply</Apply>
```


## Accessibility guidelines
- [WCAG 2.4.7](https://www.w3.org/TR/UNDERSTANDING-WCAG20/navigation-mechanisms-focus-visible.html)

### Resources
- [axe-core, focus-order-semantics](https://dequeuniversity.com/rules/axe/3.2/focus-order-semantics)
