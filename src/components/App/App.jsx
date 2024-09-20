import ContactForm from "../ContactForm/ContactForm";
import SearchBox from "../SearchBox/SearchBox";
import ContactList from "../ContactList/ContactList";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

export default function App() {
  const loading = useSelector(state => state.contacts.loading);
  const error = useSelector(state => state.contacts.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  // const starterContacts = [
  //   { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  //   { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  //   { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  //   { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  // ];

  // const [contacts, setContacts] = useState(() => {
  //   const savedContacts = window.localStorage.getItem("my-contacts");
  //   if (savedContacts !== null) {
  //     return JSON.parse(savedContacts);
  //   }

  //   return starterContacts;
  // });

  // const addNewUser = newUsers => {
  //   setContacts(prevContacts => [...prevContacts, newUsers]);
  // };

  // const deleteUser = id => {
  //   setContacts(contacts.filter(contact => contact.id !== id));
  // };

  // const [searchText, setSearchText] = useState("");
  // const handleTextChange = event => {
  //   setSearchText(event.target.value);
  // };

  // const findNewUser = contacts.filter(contact =>
  //   contact.name.toLowerCase().includes(searchText.toLowerCase())
  // );

  // useEffect(() => {
  //   window.localStorage.setItem("my-contacts", JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm />
      {loading && <Loader>Loading message...</Loader>}
      {error && <Error>Error message...</Error>}
      <SearchBox />

      <ContactList />
    </div>
  );
}
