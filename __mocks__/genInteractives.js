import JSXAttributeMock from 'JSXAttributeMock';
import JSXElementMock from 'JSXElementMock';

const interactiveElementsMap = {
  a: [
    {prop: 'href', value: '#'}
  ],
  area: [
    {prop: 'href', value: '#'}
  ],
  button: [],
  input: [
    {prop: 'type', value: 'text'}
  ],
  option: [],
  select: [],
  textarea: [],
};

const nonInteractiveElementsMap = {
  html: [],
  base: [],
  head: [],
  link: [],
  meta: [],
  style: [],
  title: [],
  address: [],
  article: [],
  aside: [],
  footer: [],
  header: [],
  h1: [],
  h2: [],
  h3: [],
  h4: [],
  h5: [],
  h6: [],
  hgroup: [],
  nav: [],
  section: [],
  dd: [],
  dl: [],
  dt: [],
  figcaption: [],
  figure: [],
  hr: [],
  li: [],
  main: [],
  ol: [],
  p: [],
  pre: [],
  ul: [],
  a: [],
  abbr: [],
  b: [],
  bdi: [],
  bdo: [],
  br: [],
  cite: [],
  code: [],
  data: [],
  dfn: [],
  em: [],
  i: [],
  kbd: [],
  mark: [],
  q: [],
  rp: [],
  rt: [],
  rtc: [],
  ruby: [],
  s: [],
  samp: [],
  small: [],
  strong: [],
  sub: [],
  sup: [],
  time: [],
  u: [],
  var: [],
  wbr: [],
  area: [],
  audio: [],
  img: [],
  map: [],
  track: [],
  video: [],
  embed: [],
  object: [],
  param: [],
  source: [],
  canvas: [],
  noscript: [],
  script: [],
  del: [],
  ins: [],
  caption: [],
  col: [],
  colgroup: [],
  table: [],
  tbody: [],
  td: [],
  tfoot: [],
  th: [],
  thead: [],
  tr: [],
  datalist: [],
  fieldset: [],
  form: [],
  input: [
    {prop: 'type', value: 'hidden'}
  ],
  label: [],
  legend: [],
  meter: [],
  optgroup: [],
  output: [],
  progress: [],
  details: [],
  dialog: [],
  menu: [],
  menuitem: [],
  summary: [],
  content: [],
  acronym: [],
  applet: [],
  big: [],
  blink: [],
  center: [],
  dir: [],
  font: [],
  frame: [],
  frameset: [],
  keygen: [],
  marquee: [],
  noembed: [],
  spacer: [],
  strike: [],
  tt: [],
  xmp: [],
};

const interactiveRoles = [
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
];

const nonInteractiveRoles = [
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
];

export function genInteractiveElements () {
  const elements = [];
  for (const name in interactiveElementsMap) {
    const attributes = interactiveElementsMap[name].map(
      ({prop, value}) => JSXAttributeMock(prop, value)
    );
    elements.push(JSXElementMock(name, attributes));
  }
  return elements;
}

export function genInteractiveRoleElements () {
  return interactiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}

export function genNonInteractiveElements () {
  const elements = [];
  for (const name in nonInteractiveElementsMap) {
    const attributes = nonInteractiveElementsMap[name].map(
      ({prop, value}) => JSXAttributeMock(prop, value)
    );
    elements.push(JSXElementMock(name, attributes));
  }
  return elements;
}

export function genNonInteractiveRoleElements () {
  return nonInteractiveRoles.map(
    value => JSXElementMock('div', [
      JSXAttributeMock('role', value)
    ])
  );
}
