import css from "./TaskForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksOps";

const TaskForm = () => {
  const nameFieldId = useId();
  const dispatch = useDispatch();

  const newtask = {
    task: "",
    cat: "buy",
  };

  const FeedbackSchema = Yup.object().shape({
    task: Yup.string()
      .min(3, "Закоротке!")
      .max(50, "Задовге!")
      .required("Обов'язково"),
    cat: Yup.string().required("Обов'язково"),
  });

  const handleSubmit = (values, actions) => {
    console.log({ ...values, done: false });
    dispatch(addTask({ ...values, done: false }));
    actions.resetForm();
    if (document.activeElement) {
      document.activeElement.blur();
    }
  };

  return (
    <>
      <Formik
        initialValues={newtask}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.taskForm}>
          <label htmlFor={nameFieldId}>Оце так</label>
          <Field
            className={css.field}
            type="text"
            name="task"
            placeholder="Введіть текст"
            id={nameFieldId}
          />
          <ErrorMessage name="task" component="span" />
          <label>
            <Field type="radio" name="cat" value="buy" />
            Купити
          </label>
          <label>
            <Field type="radio" name="cat" value="todo" />
            Зробити
          </label>
          <ErrorMessage name="cat" component="span" />
          <button type="submit" className={css.addTask}>
            Додати
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default TaskForm;
