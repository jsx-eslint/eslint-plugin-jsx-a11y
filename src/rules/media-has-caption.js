/**
 * @fileoverview <audio> and <video> elements must have a <track> for captions.
 * @author Ethan Cohen
 * @flow
 */

// ----------------------------------------------------------------------------
// Rule Definition
// ----------------------------------------------------------------------------

import type { JSXElement, JSXOpeningElement, Node } from 'ast-types-flow';
import { getProp, getLiteralPropValue } from 'jsx-ast-utils';
import flatMap from 'array.prototype.flatmap';

import type { ESLintConfig, ESLintContext, ESLintVisitorSelectorConfig } from '../../flow/eslint';
import { generateObjSchema, arraySchema } from '../util/schemas';
import getElementType from '../util/getElementType';

const errorMessage = 'Media elements such as <audio> and <video> must have a <track> for captions.';

const MEDIA_TYPES = ['audio', 'video'];

const schema = generateObjSchema({
  audio: arraySchema,
  video: arraySchema,
  track: arraySchema,
});

const isMediaType = (context, type) => {
  const options = context.options[0] || {};
  return MEDIA_TYPES
    .concat(flatMap(MEDIA_TYPES, (mediaType) => options[mediaType]))
    .some((typeToCheck) => typeToCheck === type);
};

const isTrackType = (context, type) => {
  const options = context.options[0] || {};
  return ['track'].concat(options.track || []).some((typeToCheck) => typeToCheck === type);
};

export default ({
  meta: {
    docs: {
      url: 'https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/HEAD/docs/rules/media-has-caption.md',
      description: 'Enforces that `<audio>` and `<video>` elements must have a `<track>` for captions.',
    },
    schema: [schema],
  },

  create: (context: ESLintContext): ESLintVisitorSelectorConfig => {
    const elementType = getElementType(context);
    return {
      JSXElement: (node: JSXElement) => {
        const element: JSXOpeningElement = node.openingElement;
        const type = elementType(element);
        if (!isMediaType(context, type)) {
          return;
        }
        const mutedProp = getProp(element.attributes, 'muted');
        const mutedPropVal: boolean = getLiteralPropValue(mutedProp);
        if (mutedPropVal === true) {
          return;
        }
        // $FlowFixMe https://github.com/facebook/flow/issues/1414
        const trackChildren: Array<JSXElement> = node.children.filter((child: Node) => {
          if (child.type !== 'JSXElement') {
            return false;
          }

          // $FlowFixMe https://github.com/facebook/flow/issues/1414
          return isTrackType(context, elementType(child.openingElement));
        });

        if (trackChildren.length === 0) {
          context.report({
            node: element,
            message: errorMessage,
          });
          return;
        }

        const hasCaption: boolean = trackChildren.some((track) => {
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
    };
  },
}: ESLintConfig);
