import "../components/contacts/ContactManager.css";
import ContactList from "../components/contacts/ContactList";
import ContactForm from "../components/contacts/ContactForm";
import useContacts from "../components/contacts/hooks/useContacts";

const ContactManagerPage = () => {

  const { contacts, error, loading, deleteContact, addContact, toggleFavorite } = useContacts();

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
      <ContactList
        contacts={contacts}
        handleToggleFavorite={toggleFavorite}
        handleDelete={deleteContact}
      />
      <ContactForm onAddContact={addContact} />
    </>
  );
};

export default ContactManagerPage;
