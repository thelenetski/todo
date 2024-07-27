import css from "./Contact.module.css";
import { FaEdit } from "react-icons/fa";

const Contact = ({ data, onDelete }) => {
  return (
    <div className={css.contact}>
      <div className={css.contactData}>
        <div>
          <FaEdit />
          <p>{data.name}</p>
        </div>
      </div>
      <button type="button" onClick={() => onDelete(data.id)}>
        Done
      </button>
    </div>
  );
};

export default Contact;
