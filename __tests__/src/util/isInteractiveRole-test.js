/* eslint-env mocha */
import assert from 'assert';
import isInteractiveRole from '../../../src/util/isInteractiveRole';
import attrMock from '../../__mocks__/attrMock';

describe('isInteractiveRole', () => {
  describe('JSX Components (no tagName)', () => {
    it('should identify them as interactive elements', () => {
      expect(isInteractiveRole(undefined, [])).toBe(true);
    });
  });
  describe('elements with an interactive role', () => {
    it('should identify them as interactive elements', () => {
      [
        'button',
        'checkbox',
        'link',
        'menuitem',
        'menuitemcheckbox',
        'menuitemradio',
        'option',
        'radio',
        'spinbutton',
        'tab',
        'textbox',
      ].forEach(role => expect(isInteractiveRole('div', [
        attrMock('role', role)
      ])).toBe(true));
    });
  });
  describe('elements with a non-interactive role', () => {
    it('should not identify them as interactive elements', () => {
      [
        'alert',
        'alertdialog',
        'dialog',
        'gridcell',
        'log',
        'marquee',
        'progressbar',
        'scrollbar',
        'slider',
        'status',
        'tabpanel',
        'timer',
        'tooltip',
        'treeitem',
        'combobox',
        'grid',
        'listbox',
        'menu',
        'menubar',
        'radiogroup',
        'tablist',
        'tree',
        'treegrid',
        'article',
        'columnheader',
        'definition',
        'directory',
        'document',
        'group',
        'heading',
        'img',
        'list',
        'listitem',
        'math',
        'note',
        'presentation',
        'region',
        'row',
        'rowgroup',
        'rowheader',
        'separator',
        'toolbar',
        'application',
        'banner',
        'complementary',
        'contentinfo',
        'form',
        'main',
        'navigation',
        'search',
      ].forEach(role => expect(isInteractiveRole('div', [
        attrMock('role', role)
      ])).toBe(false));
    });
  });
});
