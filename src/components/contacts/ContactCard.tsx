import { type ContactCardProps } from "./types";

const ContactCard = ({
  contact,
  onToggleFavorite,
  onDelete,
}: ContactCardProps) => {
  return (
    <div className="contact-card">
      <div>
        <strong>{contact.name}</strong>
      </div>

      <div>{contact.email}</div>

      <div>{contact.favorite ? "⭐ Favorited" : "☆ Not Favorited"}</div>

      <div className="contact-actions">
        <button onClick={() => onToggleFavorite(contact.id)}>Favorite</button>

        <button onClick={() => onDelete(contact.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ContactCard;
