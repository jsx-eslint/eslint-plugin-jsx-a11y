import getValue from './index';

const extract = value => `${getValue(value.object)}.${getValue(value.property)}`;

export default extract;
