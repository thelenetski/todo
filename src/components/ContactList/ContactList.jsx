import css from "./ContactList.module.css";
import Contact from "../Contact/Contact";

const ContactList = ({ data, onDelete, onDone }) => {
  return (
    <div className={css.contactList}>
      <ul>
        {data.map((task) => {
          return (
            <li key={task.id}>
              <Contact data={task} onDelete={onDelete} onDone={onDone} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
