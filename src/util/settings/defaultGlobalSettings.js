import { dom } from 'aria-query';

const components = [...dom.keys()].reduce(
  (elements, element) => ({
    ...elements,
    [element]: [],
  }),
  {},
);

export default {
  settings: {
    components,
    props: {
      // The casing to check for aria-* props on custom components.
      aria: 'kebab',
      // Role prop to check on custom components.
      role: 'ariaRole',
    },
  },
};
