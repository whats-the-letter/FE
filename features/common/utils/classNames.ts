export const classNames = (...props: Array<string | boolean>) =>
  props.filter((elem) => typeof elem !== "boolean").join(" ");
