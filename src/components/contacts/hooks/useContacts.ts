import { useState, useEffect } from "react";
import type { Contact } from "../types";

const useContacts = () => {
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:3001/contacts`);
        if (!response.ok) {
          throw new Error("Failed to fetch contacts");
        }

        const data: Contact[] = await response.json();
        setContacts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchContacts();
  }, []);

  const deleteContact = async (id: string) => {
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

  const addContact = async (newContact: Contact) => {
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

  const toggleFavorite = async (id: string) => {
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
            ? data
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

  return {
    contacts,
    error,
    loading,
    deleteContact,
    addContact,
    toggleFavorite
  };
};



export default useContacts;
