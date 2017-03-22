'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ariaQuery = require('aria-query');

var _jsxAstUtils = require('jsx-ast-utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nonInteractiveRoles = new Set([].concat(_toConsumableArray(_ariaQuery.roles.keys())).filter(function (name) {
  return !_ariaQuery.roles.get(name).abstract;
}).filter(function (name) {
  return !_ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return klasses.includes('widget');
  });
}));

/**
 * Returns boolean indicating whether the given element has a role
 * that is associated with a non-interactive component. Non-interactive roles
 * include `listitem`, `article`, or `dialog`. These are roles that indicate
 * for the most part containers.
 *
 * Elements with these roles should not respond or handle user interactions.
 * For example, an `onClick` handler should not be assigned to an element with
 * the role `listitem`. An element inside the `listitem`, like a button or a
 * link, should handle the click.
 *
 * This utility returns true for elements that are assigned a non-interactive
 * role. It will return false for elements that do not have a role. So whereas
 * a `div` might be considered non-interactive, for the purpose of this utility,
 * it is considered neither interactive nor non-interactive -- a determination
 * cannot be made in this case and false is returned.
 */

var isNonInteractiveRole = function isNonInteractiveRole(tagName, attributes) {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if ([].concat(_toConsumableArray(_ariaQuery.dom.keys())).indexOf(tagName) === -1) {
    return false;
  }

  var role = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));
  return nonInteractiveRoles.has(role);
};

exports.default = isNonInteractiveRole;