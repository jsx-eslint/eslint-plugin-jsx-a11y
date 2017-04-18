/**
 * @fileoverview <audio> and <video> elements must have a <track> for captions.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { Node, JSXElement, JSXOpeningElement } from 'ast-types-flow';
import { elementType, getProp, getLiteralPropValue } from 'jsx-ast-utils';
import { generateObjSchema } from '../util/schemas';

const errorMessage =
  'Media elements such as <audio> and <video> must have a <track> for captions.';

const schema = generateObjSchema();

const MEDIA_TYPES = ['audio', 'video'];

module.exports = {
  meta: {
    docs: {},
    schema: [schema],
  },

  create: (context: ESLintContext) => ({
    JSXElement: (node: JSXElement) => {
      const element: JSXOpeningElement = node.openingElement;
      const type = elementType(element);
      const isMediaType = MEDIA_TYPES.some(mediaType => mediaType === type);
      if (!isMediaType) {
        return;
      }

      const trackChildren: Array<JSXElement> = node.children.filter(child => {
        if (child.type !== 'JSXElement') {
          return false;
        }

        return elementType(child.openingElement) === 'track';
      });

      if (trackChildren.length === 0) {
        context.report({
          node: element,
          message: errorMessage,
        });
        return;
      }

      const hasCaption: boolean = trackChildren.some(track => {
        const kindProp = getProp(track.openingElement.attributes, 'kind');
        const kindPropValue = getLiteralPropValue(kindProp) || '';
        return kindPropValue.toLowerCase() === 'captions';
      });

      if (!hasCaption) {
        context.report({
          node: element,
          message: errorMessage,
        });
      }
    },
  }),
};
