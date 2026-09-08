import "../components/contacts/ContactManager.css";
import ContactList from "../components/contacts/ContactList";
import ContactForm from "../components/contacts/ContactForm";
import useContacts from "../components/contacts/hooks/useContacts";
import { Profiler, useState } from "react";

const ContactManagerPage = () => {
  const {
    contacts,
    error,
    loading,
    deleteContact,
    addContact,
    toggleFavorite,
  } = useContacts();

  const [counter, setCounter] = useState(0);

  const handleProfiler = (
    id: string,
    phase: "mount" | "update" | "nested-update",
    actualDuration: number,
  ) => {
    console.log(id, phase, actualDuration);
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
      <Profiler id="ContactList" onRender={handleProfiler}>
        <ContactList
          contacts={contacts}
          handleToggleFavorite={toggleFavorite}
          handleDelete={deleteContact}
        />
      </Profiler>
      <ContactForm onAddContact={addContact} />
      <button onClick={() => setCounter((prev) => prev + 1)}>
        Counter: {counter}
      </button>
    </>
  );
};

export default ContactManagerPage;
