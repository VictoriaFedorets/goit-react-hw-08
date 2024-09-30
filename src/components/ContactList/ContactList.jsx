import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/contacts/slice.js";
import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

export default function ContactList() {
  const contacts = useSelector(selectFilteredContacts);
  // 1. Отримуємо масив контактів із стану Redux
  // const contacts = useSelector(selectContacts);

  // // 2. Отримуємо значення фільтра із стану Redux
  // const statusFilter = useSelector(selectNameFilter);

  // // 3. Обчислюємо масив контактів, які необхідно відображати в інтерфейсі

  // const visibleContacts = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(statusFilter.toLowerCase())
  // );

  return (
    <ul className={css.contactList}>
      {contacts.map(({ id, name, number }) => (
        <Contact key={id} id={id} name={name} number={number} />
      ))}
    </ul>
  );
}
