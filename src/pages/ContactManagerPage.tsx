import "../components/contacts/ContactManager.css";
import ContactList from "../components/contacts/ContactList";
import ContactForm from "../components/contacts/ContactForm";
import { contactsData } from "../components/contacts/contactsData";
import { useState } from "react";
import { type Contact } from "../components/contacts/types";

const ContactManagerPage = () => {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);

  const handleAddContact = (newContact: Contact) => {
    setContacts((prev) => [...prev, newContact]);
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleToggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, favorite: !contact.favorite }
          : contact,
      ),
    );
  };

  return (
    <>
      <ContactList
        contacts={contacts}
        handleToggleFavorite={handleToggleFavorite}
        handleDelete={handleDelete}
      />
      <ContactForm onAddContact={handleAddContact} />
    </>
  );
};

export default ContactManagerPage;
