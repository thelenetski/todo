import css from "./ContactForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import { useId } from "react";
import * as Yup from "yup";

const ContactForm = ({ onAdd }) => {
  const nameFieldId = useId();

  const newContact = {
    name: "",
  };

  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    onAdd({ ...values, id: nanoid() });
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={newContact}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.contactForm}>
          <label htmlFor={nameFieldId}>To Do</label>
          <Field
            className={css.field}
            type="text"
            name="name"
            id={nameFieldId}
          />
          <ErrorMessage name="name" component="span" />
          <button type="submit">Add new task</button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
