const cutString = (str, length) => {
  if (typeof str !== 'string') return null;
  if (str.length < length) return str;
  return `${str.slice(0, length)} ...`;
};

export default cutString;
