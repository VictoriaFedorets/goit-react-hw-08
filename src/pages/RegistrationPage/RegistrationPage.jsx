import WrapperForm from "../../components/WrapperForm/WrapperForm.jsx";
import RegistrationForm from "../../components/RegistrationForm/RegistrationForm.jsx";
import css from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <WrapperForm>
      <h2 className={css.title}>Register your account</h2>
      <RegistrationForm />
    </WrapperForm>
  );
}
