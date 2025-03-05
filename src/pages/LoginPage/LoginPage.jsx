import LoginForm from "../../components/LoginForm/LoginForm";
import WrapperForm from "../../components/WrapperForm/WrapperForm";
import css from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <WrapperForm>
      <h2 className={css.title}>Please log in!</h2>
      <LoginForm />
    </WrapperForm>
  );
}
