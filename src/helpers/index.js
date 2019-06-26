export const sentenceCase = sentence =>
  `${sentence[0].toUpperCase()}${sentence.substr(1)}`;

export const humanize = text =>
  text
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/, ' ')
    .toLowerCase();
