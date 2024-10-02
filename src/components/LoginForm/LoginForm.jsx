import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import { selectIsLoading } from "../../redux/auth/selectors";
import { useId } from "react";

import css from "./LoginForm.module.css";

export default function LoginForm() {
  const dispatch = useDispatch();
  const id = useId();
  const isLoading = useSelector(selectIsLoading);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label htmlFor={`${id}-email`} className={css.label}>
          Email
          <Field
            type="email"
            name="email"
            id={`${id}-email`}
            autoComplete="email"
          />
        </label>

        <label htmlFor={`${id}-password`} className={css.label}>
          Password
          <Field
            id={`${id}-password`}
            type="password"
            name="password"
            autoComplete="password"
          />
        </label>

        <button type="submit" disabled={isLoading}>
          Log In
        </button>
      </Form>
    </Formik>
  );
}
