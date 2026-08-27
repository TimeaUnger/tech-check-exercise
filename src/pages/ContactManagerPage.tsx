import "../components/contacts/ContactManager.css";
import ContactList from "../components/contacts/ContactList";
import ContactForm from "../components/contacts/ContactForm";
// import { contactsData } from "../components/contacts/contactsData";
import { useEffect, useState } from "react";
import { type Contact } from "../components/contacts/types";

const ContactManagerPage = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {

      setLoading(true);

      try {
        const response = await fetch(`http://localhost:3001/contacts`);
        if (!response.ok) {
          throw new Error("Contact not found");
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      }
      finally {
        setLoading(false);
      }

    };
    
    fetchContacts();
  },[]);

  const handleAddContact = async (newContact: Contact) => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/contacts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newContact),
      });

      if (!response.ok) {
        throw new Error("Failed to add contact");
      }

      const data: Contact = await response.json();
      setContacts((prev) => [...prev, data]);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
    
  };

  const handleDelete = async (id: string) => {
    setError(null);

    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete contact");
      }

      setContacts((prev) => prev.filter((contact) => contact.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  const handleToggleFavorite = async (id: string) => {
    setError(null);

    const contact = contacts.find((contact) => contact.id === id);

    if (!contact) return;

    try {
      const response = await fetch(`http://localhost:3001/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          favorite: !contact.favorite,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const data: Contact = await response.json();
      localStorage.setItem("contact", JSON.stringify(data));
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === id
            ? { ...contact, favorite: !contact.favorite }
            : contact,
        ),
      );
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <>
      {loading && <div>Loading</div>}
      {error && <div>{error}</div>}
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
