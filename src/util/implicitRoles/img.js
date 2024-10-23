import { getProp, getLiteralPropValue } from 'jsx-ast-utils';

/**
 * Returns the implicit role for an img tag.
 */
export default function getImplicitRoleForImg(attributes) {
  const alt = getProp(attributes, 'alt');

  if (alt && getLiteralPropValue(alt) === '') {
    return '';
  }

  /**
   * If the src attribute can be determined to be an svg, allow the role to be set to 'img'
   * so that VoiceOver on Safari can be better supported.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#identifying_svg_as_an_image
   * @see https://bugs.webkit.org/show_bug.cgi?id=216364
   */
  const src = getProp(attributes, 'src');
  if (src && getLiteralPropValue(src)?.includes('.svg')) { return ''; }

  return 'img';
}
