import css from "./Contact.module.css";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

const Contact = ({ data, onDelete, onDone }) => {
  return (
    <div className={clsx(css.contact, data.done && css.done)}>
      <div className={css.contactData}>
        <div>
          {data.done ? <FaCheck /> : <FaEdit />}
          <p>{data.name}</p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button
          type="button"
          className={css.btnDone}
          onClick={() => onDone(data.id)}
        >
          {data.done ? "UnDone" : "Done"}
        </button>
        <button
          type="button"
          className={css.delete}
          onClick={() => onDelete(data.id)}
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default Contact;
