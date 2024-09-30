import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import PageTitle from "../../components/PageTitle/PageTitle";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../components/ContactForm/ContactForm";
import SearchBox from "../components/SearchBox/SearchBox";

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
    <>
      <PageTitle>Your contacts</PageTitle>
      <h1>Phonebook</h1>
      <ContactForm />
      <SearchBox />
      <div>{isLoading && !isError && "Loading contacts..."}</div>
      <ContactList />
    </>
  );
}
