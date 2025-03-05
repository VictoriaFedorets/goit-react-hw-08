import css from "./WrapperForm.module.css";

export default function WrapperForm({ children }) {
  return <div className={css.form}>{children}</div>;
}
