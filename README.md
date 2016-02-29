# eslint-plugin-jsx-a11y

A static analysis linter of jsx and its accessibility to all users.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-jsx-a11y`:

```
$ npm install eslint-plugin-jsx-a11y --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-jsx-a11y` globally.

## Usage

Add `jsx-a11y` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "jsx-a11y"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "jsx-a11y/rule-name": 2
    }
}
```

## Supported Rules

- img-uses-alt: Enforce that img jsx elements use the alt attribute.
- onClick-uses-role: Enforce that non-interactive, visible elements (such as div) that have click handlers use the role attribute.
- mouseEvents-require-keyEvents: Enforce that onMouseOver/onMouseOut are accompanied by onFocus/onBlur for strictly keyboard users.
- use-onblur-not-onchange: Enforce that onBlur is used instead of onChange.
- no-access-key: Enforce that the accessKey prop is not used on any element to avoid complications with keyboard commands used by a screenreader.
- use-label-for: Enforce that label elements have the htmlFor attribute





