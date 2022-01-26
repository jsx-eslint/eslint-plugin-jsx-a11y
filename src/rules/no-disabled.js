/**
 * @fileoverview Enforce disabled prop is not used.
 * @author Courtney Nguyen <@courtyen>
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import { propName, elementType } from "jsx-ast-utils";
import { generateObjSchema } from "../util/schemas";

const errorMessage = "The disabled prop should not be used, as it can reduce usability and accessibility for users.";

const DEFAULT_ELEMENTS = [
  "button",
  "command",
  "fieldset",
  "keygen",
  "optgroup",
  "option",
  "select",
  "textarea",
  "input",
];

const schema = generateObjSchema({
  ignoreNonDOM: {
    type: "boolean",
    default: false,
  },
});

export default {
  meta: {
    docs: {
      url: "https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/no-disabled.md",
    },
    schema: [schema],
  },

  create: (context) => ({
    JSXAttribute: (attribute) => {
      // Only monitor elements with "disabled".
      const type = elementType(attribute.parent);
      if (!DEFAULT_ELEMENTS.includes(type)) {
        return;
      }

      if (propName(attribute) === "disabled") {
        context.report({
          node: attribute,
          message: errorMessage,
        });
      }
    },
  }),
};
