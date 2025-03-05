import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WrapperForm from "../../components/WrapperForm/WrapperForm";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";

import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading, selectError } from "../../redux/contacts/selectors";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <WrapperForm>
      <p>Your contacts</p>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <div>{isLoading && !isError && "Loading contacts..."}</div>
      <ContactList />
    </WrapperForm>
  );
}
