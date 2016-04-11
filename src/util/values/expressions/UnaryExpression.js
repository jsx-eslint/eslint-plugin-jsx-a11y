import getValue from './index';

const extract = value => {
  const { operator, argument } = value;

  switch (operator) {
    case '-':
      return -getValue(argument);
    case '+':
      return Number(getValue(argument));
    case '!':
      return !getValue(argument);
    case '~':
      return ~getValue(argument);
    case 'typeof':
    case 'delete':
    case 'void':
    default:
      return undefined;
  }
};

export default extract;
