import { Formik, Form, Field } from "formik";
import { useId } from "react";
import { useDispatch } from "react-redux";
import { register } from "../../redux/auth/operations";

import css from "./RegistrationForm.module.css";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const id = useId();

  const handleSubmit = (values, actions) => {
    console.log(values);
    dispatch(register(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label} htmlFor={`${id}-userName`}>
          Username
          <Field
            type="text"
            name="name"
            id={`${id}-userName`}
            autoComplete="username"
          />
        </label>

        <label className={css.label} htmlFor={`${id}-email`}>
          Email
          <Field
            type="email"
            name="email"
            id={`${id}-email`}
            autoComplete="email"
          />
        </label>

        <label className={css.label} htmlFor={`${id}-password`}>
          Password
          <Field
            type="password"
            name="password"
            id={`${id}-password`}
            autoComplete="new-password"
          />
        </label>

        <button type="submit">Register</button>
      </Form>
    </Formik>
  );
}
