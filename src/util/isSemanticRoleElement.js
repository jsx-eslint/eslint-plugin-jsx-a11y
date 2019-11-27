/**
 * @flow
 */

import type { JSXAttribute } from 'ast-types-flow';
import { AXObjectRoles, elementAXObjects } from 'axobject-query';
import { getLiteralPropValue, getProp, propName } from 'jsx-ast-utils';

const isSemanticRoleElement = (
  elementType: string,
  attributes: Array<JSXAttribute>,
): boolean => {
  const roleAttr = getProp(attributes, 'role');
  let res = false;
  const roleAttrValue = getLiteralPropValue(roleAttr);
  elementAXObjects.forEach((axObjects, concept) => {
    if (res) {
      return;
    }
    if (
      concept.name === elementType
      && (concept.attributes || []).every(
        (cAttr) => attributes.some(
          (attr) => {
            if (!attr.type || attr.type !== 'JSXAttribute') {
              return false;
            }
            const namesMatch = cAttr.name === propName(attr);
            let valuesMatch;
            if (cAttr.value !== undefined) {
              valuesMatch = cAttr.value === getLiteralPropValue(attr);
            }
            if (!namesMatch) {
              return false;
            }
            return namesMatch && (valuesMatch !== undefined) ? valuesMatch : true;
          },
        ),
      )
    ) {
      axObjects.forEach((name) => {
        if (res) {
          return;
        }
        const roles = AXObjectRoles.get(name);
        if (roles) {
          roles.forEach((role) => {
            if (res === true) {
              return;
            }
            if (role.name === roleAttrValue) {
              res = true;
            }
          });
        }
      });
    }
  });
  return res;
};

export default isSemanticRoleElement;
