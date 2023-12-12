export const countCharacters = (text: string) => {
  let totalLength = 0;

  Array.from(text).forEach((char) => {
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char);

    if (isKorean) totalLength += 2;
    else totalLength += 1;
  });
  return totalLength;
};

export const truncateContent = (content: string, maxCharacters: number) => {
  let totalLength = 0;
  let truncatedContent = "";

  Array.from(content).forEach((char) => {
    const isKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(char);

    if (isKorean) {
      totalLength += 2;
    } else {
      totalLength += 1;
    }

    if (totalLength <= maxCharacters) {
      truncatedContent += char;
    } else {
      return;
    }
  });

  return truncatedContent;
};
