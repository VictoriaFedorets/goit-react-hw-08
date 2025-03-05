import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";
import { selectIsLoading } from "../../redux/auth/selectors";
import sprite from "../../icons/sprite.svg";

import css from "./RegistrationForm.module.css";

// const emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters.")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email, please write a valid email")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters.")
    .matches(/^[^\s]*$/, "Password should not contain spaces.")
    .max(64, "The password must be no longer than 64 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const id = useId();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const isLoading = useSelector(selectIsLoading);

  const handleShowPassword = () => {
    setShowPassword(showPassword => !showPassword);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword(showConfirmPassword => !showConfirmPassword);
  };

  const handleSubmit = ({ name, email, password }, actions) => {
    console.log({ name, email, password });
    dispatch(register({ name, email, password }));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form autoComplete="off">
          <label className={css.label} htmlFor={`${id}-userName`}>
            <p className={css.text}>Enter your name</p>
            <Field
              type="text"
              name="name"
              placeholder="User name"
              id={`${id}-userName`}
              autoComplete="name"
              className={
                errors.name && touched.name
                  ? `${css.input} ${css.inputError}`
                  : css.input
              }
            />
            <ErrorMessage name="name" component="div" className={css.error} />
          </label>

          <label className={css.label} htmlFor={`${id}-email`}>
            <p className={css.text}>Enter your email</p>
            <Field
              type="email"
              name="email"
              placeholder="E-mail"
              id={`${id}-email`}
              autoComplete="email"
              className={
                errors.email && touched.email
                  ? `${css.input} ${css.inputError}`
                  : css.input
              }
            />
            <ErrorMessage name="email" component="div" className={css.error} />
          </label>

          <label className={css.label} htmlFor={`${id}-password`}>
            <p className={css.text}>Enter your password</p>
            <Field
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              id={`${id}-password`}
              autoComplete="new-password"
              className={
                errors.password && touched.password
                  ? `${css.input} ${css.inputError}`
                  : css.input
              }
            />
            <svg
              className={css.icon}
              width={16}
              height={16}
              onClick={handleShowPassword}
            >
              {showPassword ? (
                <use href={`${sprite}#icon-eye`} />
              ) : (
                <use href={`${sprite}#icon-eye-hidden`} />
              )}
            </svg>

            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </label>

          <label className={css.label} htmlFor={`${id}-confirmPassword`}>
            <p className={css.text}>Repeat your password</p>
            <Field
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Repeat password"
              className={
                errors.confirmPassword && touched.confirmPassword
                  ? `${css.input} ${css.inputError}`
                  : css.input
              }
            />

            <svg
              className={css.icon}
              width={16}
              height={16}
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? (
                <use href={`${sprite}#icon-eye`} />
              ) : (
                <use href={`${sprite}#icon-eye-hidden`} />
              )}
            </svg>

            <ErrorMessage
              name="confirmPassword"
              component="div"
              className={css.error}
            />
          </label>

          <button className={css.btnRegister} type="submit">
            {isLoading ? <Loader /> : "Register"}
          </button>
        </Form>
      )}
    </Formik>
  );
}
