import css from './ContactList.module.css';
import Contact from '../Contact/Contact';

const ContactList = ({ data, onDelete }) => {
  return (
    <div className={css.contactList}>
      <ul>
        {data.map(user => {
          return (
            <li key={user.id}>
              <Contact data={user} onDelete={onDelete} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ContactList;
