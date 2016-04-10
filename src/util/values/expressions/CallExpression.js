import getValue from './index';

const extract = value => getValue(value.callee);

export default extract;
