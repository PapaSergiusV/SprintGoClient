export const handleText = (text) => text.replace(/\s{2,}/g, ' ').replace(/^\s+|>|</g, '');