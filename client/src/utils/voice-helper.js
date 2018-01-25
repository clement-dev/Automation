import PCRE from 'pcre-to-regexp';

const searchRequest = (recognitionText, requests) => {
  for (let i in requests) {
    const keys = [];
    const re = PCRE('%^' + requests[i] + '$%ui', keys);
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

const mapKeyMatches = (keys, match) => {
  const datas = {};
  for (let i = 0; i < keys.length; i++) {
    if ('string' === typeof keys(i)) {
      datas[keys[i]] = match[i + 1];
    }
  }

  return datas;
};

export { searchRequest };
