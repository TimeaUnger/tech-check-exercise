import { useState } from "react";
import { type ContactFormProps, type Contact } from "./types";

const ContactForm = ({ onAddContact }: ContactFormProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name) return;
    if (!email) return;

    const newContact: Contact = {
      id: Date.now(),
      name: name,
      email: email,
      favorite: false,
    };

    onAddContact(newContact);

    setName("");
    setEmail("");
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
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
  );
};

export default ContactForm;
