import PCRE from 'pcre-to-regexp';

export default (recognitionText, requests) => {
  for (let i in requests) {
    const re = PCRE('%^' + requests[i] + '$%ui');
    const match = re.exec(recognitionText.trim());

    if (match) {
      return {
        id: i,
        data: match,
      };
    }
  }

  return null;
};
