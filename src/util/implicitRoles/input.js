import { getProp, getLiteralPropValue } from 'jsx-ast-utils';

/**
 * Returns the implicit role for an input tag.
 *
 * @see https://www.w3.org/TR/html-aria/#el-input-text-list
 * `input` with type = text, search, tel, url, email, or with a missing or invalid type
 * with a list attribute will have an implicit role=combobox.
 */
export default function getImplicitRoleForInput(attributes) {
  const type = getProp(attributes, 'type');
  const hasListAttribute = !!getProp(attributes, 'list');

  if (type) {
    const value = getLiteralPropValue(type) || '';

    switch (typeof value === 'string' && value.toUpperCase()) {
      case 'COLOR':
      case 'DATE':
      case 'DATETIME-LOCAL':
      case 'FILE':
      case 'HIDDEN':
      case 'MONTH':
      case 'PASSWORD':
      case 'TIME':
      case 'WEEK':
        /** No corresponding role */
        return '';
      case 'BUTTON':
      case 'IMAGE':
      case 'RESET':
      case 'SUBMIT':
        return 'button';
      case 'CHECKBOX':
        return 'checkbox';
      case 'RADIO':
        return 'radio';
      case 'RANGE':
        return 'slider';
      case 'NUMBER':
        return 'spinbutton';
      case 'SEARCH':
        return hasListAttribute ? 'combobox' : 'searchbox';
      case 'EMAIL':
      case 'TEL':
      case 'TEXT':
      case 'URL':
      default:
        return hasListAttribute ? 'combobox' : 'textbox';
    }
  }

  return hasListAttribute ? 'combobox' : 'textbox';
}
