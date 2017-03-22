'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nonInteractiveElementsMap = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ariaQuery = require('aria-query');

var _jsxAstUtils = require('jsx-ast-utils');

var _getTabIndex = require('./getTabIndex');

var _getTabIndex2 = _interopRequireDefault(_getTabIndex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var nonInteractiveRoles = new Set([].concat(_toConsumableArray(_ariaQuery.roles.keys())).filter(function (name) {
  return !_ariaQuery.roles.get(name).abstract;
}).filter(function (name) {
  return !_ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return klasses.includes('widget');
  });
}));

var pureNonInteractiveElements = [].concat(_toConsumableArray(_ariaQuery.elementRoles.entries())).reduce(function (accumulator, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      elementSchema = _ref2[0],
      roleSet = _ref2[1];

  var nonInteractiveElements = accumulator;
  var elementName = elementSchema.name;
  var elementAttributes = elementSchema.attributes || [];
  nonInteractiveElements[elementName] = function (attributes) {
    var passedAttrCheck = elementAttributes.length === 0 || elementAttributes.every(function (controlAttr) {
      return attributes.some(function (attr) {
        if (attr.type !== 'JSXAttribute') {
          return false;
        }
        return controlAttr.name === (0, _jsxAstUtils.propName)(attr).toLowerCase() && controlAttr.value === (0, _jsxAstUtils.getLiteralPropValue)(attr);
      });
    });
    return passedAttrCheck && [].concat(_toConsumableArray(roleSet.keys())).every(function (roleName) {
      return nonInteractiveRoles.has(roleName);
    });
  };
  return nonInteractiveElements;
}, {});

var isNotLink = function isNotLink(attributes) {
  var href = (0, _jsxAstUtils.getPropValue)((0, _jsxAstUtils.getProp)(attributes, 'href'));
  var tabIndex = (0, _getTabIndex2.default)((0, _jsxAstUtils.getProp)(attributes, 'tabIndex'));
  return href === undefined && tabIndex === undefined;
};

var nonInteractiveElementsMap = exports.nonInteractiveElementsMap = _extends({}, pureNonInteractiveElements, {
  area: isNotLink,
  input: function input(attributes) {
    var typeAttr = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'type'));
    return typeAttr ? typeAttr.toLowerCase() === 'hidden' : false;
  },
  table: function table(attributes) {
    var roleAttr = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));
    return roleAttr ? roleAttr.toLowerCase() !== 'grid' : true;
  },
  td: function td(attributes) {
    var roleAttr = (0, _jsxAstUtils.getLiteralPropValue)((0, _jsxAstUtils.getProp)(attributes, 'role'));
    return roleAttr ? roleAttr.toLowerCase() !== 'gridcell' : true;
  }
});

/**
 * Returns boolean indicating whether the given element is a non-interactive
 * element. If the element has either a non-interactive role assigned or it
 * is an element with an inherently non-interactive role, then this utility
 * returns true. Elements that lack either an explicitly assigned role or
 * an inherent role are not considered. For those, this utility returns false
 * because a positive determination of interactiveness cannot be determined.
 */
var isNonInteractiveElement = function isNonInteractiveElement(tagName, attributes) {
  // Do not test higher level JSX components, as we do not know what
  // low-level DOM element this maps to.
  if ([].concat(_toConsumableArray(_ariaQuery.dom.keys())).indexOf(tagName) === -1) {
    return false;
  }

  // The element does not have an explicit role, determine if it has an
  // inherently non-interactive role.
  if ({}.hasOwnProperty.call(nonInteractiveElementsMap, tagName) === false) {
    return false;
  }

  return nonInteractiveElementsMap[tagName](attributes);
};

exports.default = isNonInteractiveElement;