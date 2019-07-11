const sanitizeHTML = (str: string): string =>
  str.replace(
    /[&<>'"]/g,
    (m: string): string => {
      const entityMap = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;"
      };

      return entityMap[m];
    }
  );

export default (UNSAFE_str: string, len: number): string => {
  const UNSAFE_words = UNSAFE_str.split(/\s+/);

  let UNSAFE_out = "";

  while (UNSAFE_words.length) {
    const UNSAFE_word = UNSAFE_words.shift();

    if (UNSAFE_out.length + UNSAFE_word.length <= len) {
      UNSAFE_out += UNSAFE_word + " ";
    } else {
      return `<span title="${sanitizeHTML(UNSAFE_str)}">${sanitizeHTML(
        UNSAFE_out.trim() + "…"
      )}</span>`;
    }
  }

  return sanitizeHTML(UNSAFE_str);
};
