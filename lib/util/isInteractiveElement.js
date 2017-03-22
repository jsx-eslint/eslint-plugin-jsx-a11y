'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.interactiveElementsMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ariaQuery = require('aria-query');

var _jsxAstUtils = require('jsx-ast-utils');

var _getTabIndex = require('./getTabIndex');

var _getTabIndex2 = _interopRequireDefault(_getTabIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var interactiveRoles = new Set([].concat([].concat(_toConsumableArray(_ariaQuery.roles.keys())),
// 'toolbar' does not descend from widget, but it does support
// aria-activedescendant, thus in practice we treat it as a widget.
'toolbar').filter(function (name) {
  return !_ariaQuery.roles.get(name).abstract;
}).filter(function (name) {
  return _ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return klasses.includes('widget');
  });
}));

// Map of tagNames to functions that return whether that element is interactive or not.
var pureInteractiveRoleElements = [].concat(_toConsumableArray(_ariaQuery.elementRoles.entries())).reduce(function (accumulator, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      elementSchema = _ref2[0],
      roleSet = _ref2[1];

  var interactiveElements = accumulator;
  var elementName = elementSchema.name;
  var elementAttributes = elementSchema.attributes || [];
  interactiveElements[elementName] = function (attributes) {
    var passedAttrCheck = elementAttributes.length === 0 || elementAttributes.every(function (controlAttr) {
      return attributes.some(function (attr) {
        if (attr.type !== 'JSXAttribute') {
          return false;
        }
        return controlAttr.name === (0, _jsxAstUtils.propName)(attr).toLowerCase() && controlAttr.value === (0, _jsxAstUtils.getLiteralPropValue)(attr);
      });
    });
    // [].some is used here because some elements are associated with both
    // interactive and non-interactive roles. Like select, which is
    // associated with combobox and listbox.
    return passedAttrCheck && [].concat(_toConsumableArray(roleSet.keys())).some(function (roleName) {
      return interactiveRoles.has(roleName);
    });
  };
  return interactiveElements;
}, {});

var isLink = function isLink(attributes) {
  var href = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(attributes, 'href'));
  var tabIndex = (0, _getTabIndex2.default)((0, _jsxAstUtils.getProp)(attributes, 'tabIndex'));
  return href !== undefined || tabIndex !== undefined;
};

var interactiveElementsMap = exports.interactiveElementsMap = _extends({}, pureInteractiveRoleElements, {
  a: isLink,
  area: isLink,
  input: function input(attributes) {
    var typeAttr = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'type'));
    return typeAttr ? typeAttr.toUpperCase() !== 'HIDDEN' : true;
  },
  // Although this is associated with an interactive role, it should not be
  // considered interactive in HTML.
  link: function link() {
    return false;
  },
  td: function td(attributes) {
    return (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role')) === 'gridcell';
  },
  table: function table(attributes) {
    var role = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));
    return role === 'grid';
  }
});

/**
 * Returns boolean indicating whether the given element is
 * interactive on the DOM or not. Usually used when an element
 * has a dynamic handler on it and we need to discern whether or not
 * it's intention is to be interacted with on the DOM.
 */
var isInteractiveElement = function isInteractiveElement(tagName, attributes) {
  if ({}.hasOwnProperty.call(interactiveElementsMap, tagName) === false) {
    return false;
  }

  return interactiveElementsMap[tagName](attributes);
};

exports.default = isInteractiveElement;