'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _ariaQuery = require('aria-query');

var _axobjectQuery = require('axobject-query');

var _jsxAstUtils = require('jsx-ast-utils');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var roleKeys = [].concat(_toConsumableArray(_ariaQuery.roles.keys()));

var nonInteractiveRoles = new Set(roleKeys.filter(function (name) {
  return !_ariaQuery.roles.get(name).abstract;
}).filter(function (name) {
  return !_ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return klasses.includes('widget');
  });
}));

var interactiveRoles = new Set(roleKeys.filter(function (name) {
  return !_ariaQuery.roles.get(name).abstract;
}).filter(function (name) {
  return _ariaQuery.roles.get(name).superClass.some(function (klasses) {
    return klasses.includes('widget');
  });
}));

var nonInteractiveElementRoles = [].concat(_toConsumableArray(_ariaQuery.elementRoles.entries())).reduce(function (accumulator, _ref) {
  var _ref2 = _slicedToArray(_ref, 2),
      elementSchema = _ref2[0],
      roleSet = _ref2[1];

  if ([].concat(_toConsumableArray(roleSet.keys())).every(function (role) {
    return nonInteractiveRoles.has(role);
  })) {
    accumulator.set(elementSchema, roleSet);
  }
  return accumulator;
}, new Map([]));

var interactiveElementRoles = [].concat(_toConsumableArray(_ariaQuery.elementRoles.entries())).reduce(function (accumulator, _ref3) {
  var _ref4 = _slicedToArray(_ref3, 2),
      elementSchema = _ref4[0],
      roleSet = _ref4[1];

  if ([].concat(_toConsumableArray(roleSet.keys())).some(function (role) {
    return interactiveRoles.has(role);
  })) {
    accumulator.set(elementSchema, roleSet);
  }
  return accumulator;
}, new Map([]));

var nonInteractiveAXObjects = new Set([].concat(_toConsumableArray(_axobjectQuery.AXObjects.keys())).filter(function (name) {
  return ['window', 'structure'].includes(_axobjectQuery.AXObjects.get(name).type);
}));

var nonInteractiveElementAXObjects = [].concat(_toConsumableArray(_axobjectQuery.elementAXObjects.entries())).reduce(function (accumulator, _ref5) {
  var _ref6 = _slicedToArray(_ref5, 2),
      elementSchema = _ref6[0],
      AXObjectSet = _ref6[1];

  if ([].concat(_toConsumableArray(AXObjectSet.keys())).every(function (role) {
    return nonInteractiveAXObjects.has(role);
  })) {
    accumulator.set(elementSchema, AXObjectSet);
  }
  return accumulator;
}, new Map([]));

function attributesComparator() {
  var baseAttributes = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var attributes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  return baseAttributes.every(function (baseAttr) {
    return attributes.some(function (attribute) {
      // Guard against non-JSXAttribute nodes like JSXSpreadAttribute
      if (attribute.type !== 'JSXAttribute') {
        return false;
      }
      var attrMatches = false;
      var valueMatches = true;
      // Attribute matches.
      if (baseAttr.name === (0, _jsxAstUtils.propName)(attribute).toLowerCase()) {
        attrMatches = true;
      }
      // Value exists and matches.
      if (baseAttr.value) {
        valueMatches = baseAttr.value === (0, _jsxAstUtils.getLiteralPropValue)(attribute);
      }
      return attrMatches && valueMatches;
    });
  });
}

function checkIsNonInteractiveElement(tagName, attributes) {
  // Check in configuration for an override.

  // Check in elementRoles for inherent non-interactive role associations for
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = nonInteractiveElementRoles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _slicedToArray(_step.value, 1),
          elementSchema = _step$value[0];

      if (tagName === elementSchema.name && attributesComparator(elementSchema.attributes, attributes)) {
        return true;
      }
    }

    // Check in elementRoles for inherent interactive role associations for
    // this element.
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = interactiveElementRoles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _slicedToArray(_step2.value, 1),
          elementSchema = _step2$value[0];

      if (tagName === elementSchema.name && attributesComparator(elementSchema.attributes, attributes)) {
        return false;
      }
    }

    // Check in elementAXObjects for AX Tree associations for this element.
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = nonInteractiveElementAXObjects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var _step3$value = _slicedToArray(_step3.value, 1),
          elementSchema = _step3$value[0];

      if (tagName === elementSchema.name) {
        return attributesComparator(elementSchema.attributes, attributes);
      }
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3.return) {
        _iterator3.return();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return false;
}

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

  return checkIsNonInteractiveElement(tagName, attributes);
};

exports.default = isNonInteractiveElement;