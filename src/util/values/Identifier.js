const extract = value => {
  const { name } = value;

  return name == 'undefined' ? undefined : name;
};

export default extract;
