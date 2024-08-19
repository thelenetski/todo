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
  };

  const FeedbackSchema = Yup.object().shape({
    task: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
  });

  const handleSubmit = (values, actions) => {
    console.log({ ...values, done: false });
    dispatch(addTask({ ...values, done: false }));
    actions.resetForm();
  };

  return (
    <>
      <Formik
        initialValues={newtask}
        validationSchema={FeedbackSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.taskForm}>
          <label htmlFor={nameFieldId}>To Do</label>
          <Field
            className={css.field}
            type="text"
            name="task"
            placeholder="Enter text"
            id={nameFieldId}
          />
          <ErrorMessage name="task" component="span" />
          <button type="submit" className={css.addTask}>
            Add task
          </button>
        </Form>
      </Formik>
    </>
  );
};

export default TaskForm;
