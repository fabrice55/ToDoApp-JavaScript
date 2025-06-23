import sanitizeHTML from 'sanitize-html';

export const cleanInput = (text: string): string => {
  return sanitizeHTML(text, { allowedTags: [], allowedAttributes: {} });
};
