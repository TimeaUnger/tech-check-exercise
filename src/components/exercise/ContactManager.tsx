import { useState } from "react";
import "../styles/ContactManager.css";

interface Contact {
  id: number;
  name: string;
  email: string;
  favorite: boolean;
}

interface ContactListProps {
  contactsData: Contact[];
}

interface ContactCardProps {
  contact: Contact;
  handleToggleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
}

export const ContactList = ({ contactsData }: ContactListProps) => {
  const [contacts, setContacts] = useState<Contact[]>(contactsData);
  //   const [name, setName] = useState<string>("");
  //   const [email, setEmail] = useState<string>("");
  const [search, setSearch] = useState<string>("");

  const handleToggleFavorite = (id: number) => {
    setContacts((prev) =>
      prev.map((contact) =>
        contact.id === id
          ? { ...contact, favorite: !contact.favorite }
          : contact,
      ),
    );
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  //   const handleAddContact = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();

  //     if (!name) return;
  //     if (!email) return;

  //     const newContact = {
  //       id: Date.now(),
  //       name: name,
  //       email: email,
  //       favorite: false,
  //     };

  //     setContacts((prev) => [...prev, newContact]);

  //     setName("");
  //     setEmail("");
  //   };

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="contact-manager">
      <h2>Contact Manager</h2>

      <div className="search-box">
        <label>Search</label>
        <input value={search} onChange={(e) => handleSearch(e.target.value)} />
      </div>

      <div className="contact-list">
        {filteredContacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            handleToggleFavorite={handleToggleFavorite}
            handleDelete={handleDelete}
          />
        ))}
      </div>

      <form className="contact-form" onSubmit={handleAddContact}>
        <h3>Add Contact</h3>

        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export const ContactCard = ({
  contact,
  handleToggleFavorite,
  handleDelete,
}: ContactCardProps) => {
  return (
    <div className="contact-card">
      <div>
        <strong>{contact.name}</strong>
      </div>

      <div>{contact.email}</div>

      <div>{contact.favorite ? "⭐ Favorited" : "☆ Not Favorited"}</div>

      <div className="contact-actions">
        <button onClick={() => handleToggleFavorite(contact.id)}>
          Favorite
        </button>

        <button onClick={() => handleDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
};
