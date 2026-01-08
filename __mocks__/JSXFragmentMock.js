/**
 * @flow
 */

export type JSXFragmentMockType = {
  type: 'JSXFragment',
  children: Array<Node>,
};

export default function JSXFragmentMock(
  children?: Array<Node> = [],
): JSXFragmentMockType {
  return {
    type: 'JSXFragment',
    children,
  };
}
