import { useState } from "react";
import { type ContactListProps } from "./types";
import ContactCard from "./ContactCard";

const ContactList = ({
  contacts,
  handleToggleFavorite,
  handleDelete,
}: ContactListProps) => {
  const [search, setSearch] = useState<string>("");

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
            onToggleFavorite={handleToggleFavorite}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactList;
