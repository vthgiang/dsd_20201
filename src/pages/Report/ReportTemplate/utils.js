export const getFormatTagName = (format) => {
  if (format === 'header') return 'h3';
  if (format === 'quote') return 'blockquote';
  return 'p';
};

export const getFormatClassNames = (format) => {
  if (format === 'header') return 'u-formatHeader';
  if (format === 'quote') return 'u-formatQuote';
  return 'u-formatPara';
};
