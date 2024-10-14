import css from "./TaskForm.module.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/tasksOps";
import { FormControlLabel, Radio, RadioGroup } from "@mui/material";

const TaskForm = () => {
  const nameFieldId = useId();
  const dispatch = useDispatch();

  const newtask = {
    task: "",
    cat: "buy",
    done: false,
  };

  const FeedbackSchema = Yup.object().shape({
    task: Yup.string()
      .min(3, "Закоротке!")
      .max(50, "Задовге!")
      .required("Обов'язково"),
    cat: Yup.string(),
  });

  const handleSubmit = (values, actions) => {
    console.log({ ...values, done: false });
    dispatch(addTask(values));
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
        {({ values, handleChange }) => (
          <Form className={css.taskForm}>
            <label htmlFor={nameFieldId} className={css.formTitle}>
              Оце так
            </label>
            <Field
              className={css.field}
              type="text"
              name="task"
              placeholder="Введіть текст"
              id={nameFieldId}
            />
            <ErrorMessage name="task" component="span" />
            <RadioGroup
              row
              aria-labelledby="cat-value"
              // defaultValue="buy"
              value={values.cat}
              onChange={handleChange}
              name="cat"
            >
              <FormControlLabel
                value="buy"
                control={
                  <Radio
                    size="small"
                    sx={{
                      paddingRight: "5px",
                    }}
                  />
                }
                label="Купити"
                sx={{ fontSize: "10px" }}
              />
              <FormControlLabel
                value="todo"
                control={<Radio size="small" sx={{ paddingRight: "5px" }} />}
                label="Зробити"
              />
            </RadioGroup>
            <ErrorMessage name="cat" component="span" />
            <button type="submit" className={css.addTask}>
              Додати
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
