import css from "./TaskForm.module.css";
import { Formik, Form, Field } from "formik";
import { useId, useState } from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../../redux/tasksOps";
import { selectActiveType } from "../../redux/selectors";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const TaskForm = () => {
  const nameFieldId = useId();
  const categorySelectId = useId();
  const dispatch = useDispatch();
  const type = useSelector(selectActiveType);
  const [category, setCategory] = useState("");

  const newtask = {
    task: "",
    type: "buy",
    category: "",
    done: false,
  };

  const FeedbackSchema = Yup.object().shape({
    task: Yup.string()
      .min(3, "Закоротке!")
      .max(50, "Задовге!")
      .required("Обов'язково"),
    type: Yup.string(),
    category: Yup.string(),
  });

  const handleCategoryChange = (event, setFieldValue) => {
    setCategory(event.target.value);
    setFieldValue("category", event.target.value);
  };

  const handleSubmit = (values, actions) => {
    const tab = (type === "1" && "buy") || "todo";
    dispatch(addTask({ ...values, type: tab }));
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
        {({ setFieldValue }) => (
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
            <div className={css.catBtnBox}>
              <FormControl
                fullWidth
                sx={{
                  minWidth: "120px",
                  width: "fit-content",
                  margin: "3px 0",
                  fontSize: "15px",
                  borderRadius: "5px",
                  boxSizing: "border-box",
                  paddingLeft: "5px",
                  color: "#000000",
                  "& .MuiInputBase-root": {
                    height: "35px",
                    fontSize: "15px",
                    textAlign: "left",
                    background: "#ffffff",
                  },
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "1px solid #0a5d71b5",
                  },
                }}
              >
                <InputLabel
                  id={categorySelectId}
                  sx={{
                    fontSize: "15px",
                    paddingLeft: "5px",
                    top: "-10px",
                    "&.MuiInputLabel-shrink": {
                      top: "0",
                    },
                  }}
                >
                  Категорія
                </InputLabel>
                <Select
                  labelId={categorySelectId}
                  id="category"
                  name="category"
                  value={category}
                  label="Категорія"
                  onChange={(e) => handleCategoryChange(e, setFieldValue)}
                >
                  <MenuItem value="">- Нічого -</MenuItem>
                  <MenuItem value="молочне">Молочне</MenuItem>
                  <MenuItem value="мясне">Мясне</MenuItem>
                  <MenuItem value="напої">Напої</MenuItem>
                  <MenuItem value="овочі">Овочі</MenuItem>
                  <MenuItem value="солодке">Солодке</MenuItem>
                  <MenuItem value="фрукти">Фрукти</MenuItem>
                </Select>
              </FormControl>

              <button type="submit" className={css.addTask}>
                Додати
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default TaskForm;
