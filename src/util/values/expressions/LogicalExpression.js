import getValue from './index';

const extract = value => {
  const { operator, left, right } = value;
  const leftVal = getValue(left);
  const rightVal = getValue(right);

  return operator == '&&' ? leftVal && rightVal : leftVal || rightVal;
};

export default extract;
