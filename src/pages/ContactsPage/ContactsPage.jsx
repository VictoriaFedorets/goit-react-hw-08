import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import WrapperForm from "../../components/WrapperForm/WrapperForm";
import ContactList from "../../components/ContactList/ContactList";
import ContactForm from "../../components/ContactForm/ContactForm";
import SearchBox from "../../components/SearchBox/SearchBox";
import { fetchContacts } from "../../redux/contacts/operations";
import { selectLoading, selectError } from "../../redux/contacts/selectors";
import css from "./ContactsPage.module.css";

export default function ContactsPage() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const isError = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      <WrapperForm>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm />
      </WrapperForm>

      <SearchBox />
      <div>{isLoading && !isError && "Loading contacts..."}</div>
      <h2 className={css.contTitle}>Your contacts</h2>
      <ContactList />
    </>
  );
}
