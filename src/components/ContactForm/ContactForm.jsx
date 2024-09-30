import { addContact } from "../../redux/contacts/operations";
import { useDispatch } from "react-redux";
import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import css from "./ContactForm.module.css";

const UserSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^\d{3}-\d{2}-\d{2}$/, "Format ***-**-**")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const id = useId();

  function handleSubmit(values, actions) {
    const onAdd = { ...values, id: Date.now() };
    dispatch(addContact(onAdd));
    actions.resetForm();
  }

  // Variant 2
  //   const handleSubmit = event => {
  //     event.preventDefault();

  //     onAdd({
  //       name: event.target.elements.name.value,
  //       number: event.target.elements.number.value,
  //     });

  //     event.target.reset();
  //   };

  return (
    <Formik
      //   обэкт початкового стану(початкових значень)
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={UserSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.forms}>
          <label className={css.label} htmlFor={`${id}-name`}>
            Name
          </label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={`${id}-name`}
          />
          <ErrorMessage name="name" component="span" className={css.error} />
        </div>

        <div className={css.forms}>
          <label className={css.label} htmlFor={`${id}-number`}>
            Number
          </label>
          <Field
            className={css.field}
            type="text"
            name="number"
            id={`${id}-number`}
          />
          <ErrorMessage name="number" component="span" className={css.error} />
        </div>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
