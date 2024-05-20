export const determinePhrase = (albumPhrases: string) => {
  switch (albumPhrases) {
    case "editor-1":
      return "HBD";
    case "editor-2":
      return "HEALTH";
    case "editor-3":
      return "LOVE";
    case "editor-4":
      return "MONEY";
    case "editor-5":
      return "SUCCESS";
    default:
      return "PARENTS";
  }
};

export const changePhrase = (albumPhrases: string) => {
  switch (albumPhrases) {
    case "HBD":
      return "editor-1";
    case "HEALTH":
      return "editor-2";
    case "LOVE":
      return "editor-3";
    case "MONEY":
      return "editor-4";
    case "SUCCESS":
      return "editor-5";
    default:
      return "";
  }
};

export const changeCover = (albumCover: string) => {
  switch (albumCover) {
    case "LOVE":
      return "editor-love";
    case "MONEY":
      return "editor-money";
    case "SUCCESS":
      return "editor-success";
    case "HEALTH":
      return "editor-health";
    default:
      return "";
  }
};
