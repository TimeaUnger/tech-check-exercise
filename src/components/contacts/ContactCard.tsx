import { NavLink } from "react-router-dom";
import { type ContactCardProps } from "./types";

const ContactCard = ({
  contact,
  onToggleFavorite,
  onDelete,
}: ContactCardProps) => {
  return (
    <div className="contact-card">
      <div>
        <NavLink to={`/contacts/${contact.id}`}>
          <strong>{contact.name}</strong>
        </NavLink>
      </div>

      <div>{contact.email}</div>
      <div>{contact.role}</div>

      <div>{contact.favorite ? "⭐ Favorited" : "☆ Not Favorited"}</div>

      <div className="contact-actions">
        <button onClick={() => onToggleFavorite(contact.id)}>Favorite</button>

        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;
