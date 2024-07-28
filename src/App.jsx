import "./App.css";
import contactsData from "./contacts.json";
import ContactForm from "./components/ContactForm/ContactForm";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactList from "./components/ContactList/ContactList";
import { useEffect, useState } from "react";

function App() {
  const [contacts, setContacts] = useState(() => {
    if (localStorage.getItem("todoData") !== null) {
      return JSON.parse(localStorage.getItem("todoData"));
    }

    return contactsData;
  });
  const [filter, setFilter] = useState("");

  useEffect(() => {
    localStorage.setItem("todoData", JSON.stringify(contacts));
  }, [contacts]);

  const handleAdd = (newUser) => {
    setContacts((prev) => {
      return [...prev, newUser];
    });
  };

  const handleDelete = (id) => {
    setContacts((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const handleDone = (id) => {
    setContacts((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            done: !item["done"] ? true : !item["done"],
          };
        }

        return item;
      });
    });
  };

  const visibleContactList = contacts.filter((item) =>
    item.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <h1>Make List</h1>
      <ContactForm onAdd={handleAdd} />
      <SearchBox value={filter} onFilter={setFilter} />
      <ContactList
        data={visibleContactList}
        onDelete={handleDelete}
        onDone={handleDone}
      />
    </>
  );
}

export default App;
