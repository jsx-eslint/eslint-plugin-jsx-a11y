const extract = value => {
  const { value: extractedValue } = value;

  if (extractedValue === "true") {
    return true;
  } else if (extractedValue === "false") {
    return false;
  }

  return extractedValue;
};

export default extract;
