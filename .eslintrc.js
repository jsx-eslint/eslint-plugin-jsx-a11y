module.exports = {

  "env": {
    "node": true,
    "commonjs": true,
    "es6": true
  },

  "ecmaFeatures": {
    "arrowFunctions": true,
    "binaryLiterals": false,
    "blockBindings": true,
    "classes": false,
    "defaultParams": true,
    "destructuring": true,
    "forOf": false,
    "generators": false,
    "modules": true,
    "objectLiteralComputedProperties": false,
    "objectLiteralDuplicateProperties": false,
    "objectLiteralShorthandMethods": true,
    "objectLiteralShorthandProperties": true,
    "octalLiterals": false,
    "regexUFlag": false,
    "regexYFlag": false,
    "restParams": true,
    "spread": true,
    "superInFunctions": true,
    "templateStrings": true,
    "unicodeCodePointEscapes": false,
    "globalReturns": false,
    "jsx": true,
    "experimentalObjectRestSpread": true
  },

  "parser": "babel-eslint",

  "rules": {
    "array-bracket-spacing": [ 2, "always" ],
    "arrow-body-style": [ 2, "as-needed" ],
    "arrow-parens": [ 2, "as-needed" ],
    "block-scoped-var": 2,
    "block-spacing": [ 2, "always" ],
    "brace-style": [ 2, "1tbs", {
      "allowSingleLine": false
    } ],
    "comma-dangle": [ 2, "never" ],
    "comma-spacing": [ 2, {
      "after": true,
      "before": false
    } ],
    "consistent-return": 2,
    "consistent-this": [ 2, "self" ],
    "constructor-super": 2,
    "curly": [ 2, "all" ],
    "dot-location": [ 2, "property" ],
    "dot-notation": 2,
    "eol-last": 2,
    "indent": [ 2, 2, {
      "SwitchCase": 1
    } ],
    "jsx-quotes": [ 2, "prefer-double" ],
    "max-len": [ 2, 125, 2, {
      "ignorePattern": "((^import[^;]+;$)|(^\\s*it\\())",
      "ignoreUrls": true
    } ],
    "no-alert": 2,
    "no-confusing-arrow": 2,
    "no-caller": 2,
    "no-class-assign": 2,
    "no-cond-assign": [ 2, "always" ],
    "no-console": 1,
    "no-const-assign": 2,
    "no-constant-condition": 2,
    "no-control-regex": 2,
    "no-debugger": 1,
    "no-dupe-args": 2,
    "no-dupe-class-members": 2,
    "no-dupe-keys": 2,
    "no-duplicate-case": 2,
    "no-else-return": 2,
    "no-empty": 2,
    "no-empty-character-class": 2,
    "no-eq-null": 2,
    "no-eval": 2,
    "no-ex-assign": 2,
    "no-extend-native": 2,
    "no-extra-bind": 2,
    "no-extra-boolean-cast": 2,
    "no-extra-parens": [ 2, "functions" ],
    "no-extra-semi": 2,
    "no-func-assign": 2,
    "no-implicit-coercion": [ 2, {
      "boolean": true,
      "number": true,
      "string": true
    } ],
    "no-implied-eval": 2,
    "no-inner-declarations": [ 2, "both" ],
    "no-invalid-regexp": 2,
    "no-invalid-this": 2,
    "no-irregular-whitespace": 2,
    "no-lonely-if": 2,
    "no-negated-condition": 2,
    "no-negated-in-lhs": 2,
    "no-new": 2,
    "no-new-func": 2,
    "no-new-object": 2,
    "no-obj-calls": 2,
    "no-proto": 2,
    "no-redeclare": 2,
    "no-regex-spaces": 2,
    "no-return-assign": 2,
    "no-self-compare": 2,
    "no-sequences": 2,
    "no-sparse-arrays": 2,
    "no-this-before-super": 2,
    "no-trailing-spaces": 2,
    "no-undef": 2,
    "no-unexpected-multiline": 2,
    "no-unneeded-ternary": 2,
    "no-unreachable": 2,
    "no-unused-vars": [ 1, {
      "args": "after-used",
      "vars": "all",
      "varsIgnorePattern": "React"
    } ],
    "no-use-before-define": 2,
    "no-useless-call": 2,
    "no-useless-concat": 2,
    "no-var": 2,
    "no-warning-comments": [ 1, {
      "location": "anywhere",
      "terms": [
        "todo"
      ]
    } ],
    "no-with": 2,
    "object-curly-spacing": [ 2, "always" ],
    "object-shorthand": 2,
    "one-var": [ 2, "never" ],
    "prefer-arrow-callback": 2,
    "prefer-const": 2,
    "prefer-spread": 2,
    "prefer-template": 2,
    'quotes': [2, 'single', 'avoid-escape'],
    "radix": 2,
    "semi": 2,
    "sort-vars": [ 2, {
      "ignoreCase": true
    } ],
    "keyword-spacing": 2,
    "space-before-blocks": [ 2, "always" ],
    "space-before-function-paren": [ 2, "never" ],
    "space-infix-ops": [ 2, {
      "int32Hint": false
    } ],
    "use-isnan": 2,
    "valid-typeof": 2,
    "vars-on-top": 2,
    "yoda": [ 2, "never" ]
  }
};
