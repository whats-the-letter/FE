import styles from "./Button.module.scss";

type ButtonProps = {
  children: string;
};

function Button({ children }: ButtonProps) {
  return <button className={styles.button_blue}>{children}</button>;
}
export default Button;
