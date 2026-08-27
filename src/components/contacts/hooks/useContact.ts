import { useState, useEffect } from "react";
import type { Contact } from "../types";

const useContact = (contactID: string) => {
  const [contactDetails, setContactDetails] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchContactDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/contacts/${contactID}`,
        );

        if (!response.ok) {
          throw new Error("Contact not found");
        }

        const data: Contact = await response.json();
        localStorage.setItem("contact", JSON.stringify(data));

        setContactDetails(data);
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

    fetchContactDetails();
  }, [contactID]);

  const updateContact = async (editContact: Contact) => {

    setError(null);

    try {
      const response = await fetch(
        `http://localhost:3001/contacts/${contactID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editContact),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to update contact");
      }

      const data: Contact = await response.json();
      localStorage.setItem("contact", JSON.stringify(data));
      setContactDetails(data);

      return data;
      
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return {
    contactDetails,
    error,
    loading,
    updateContact,
  };
};

export default useContact;
