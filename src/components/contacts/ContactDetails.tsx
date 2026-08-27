import { Link } from "react-router-dom";
import type { Contact, ContactDetailsProps, Role } from "./types";
import { useState, useLayoutEffect, useRef, useEffect } from "react";

const ContactDetails = ({ contactID }: ContactDetailsProps) => {
  const [cardWidth, setCardWitdth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contactDetails, setContactDetails] = useState<Contact | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editContact, setEditContact] = useState<Contact | null>(null);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const width = cardRef.current.getBoundingClientRect().width;

    setCardWitdth(width);
  }, [contactDetails]);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchContacts = async () => {
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

    fetchContacts();
  }, [contactID]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditContact(contactDetails);
  };

  const handleSaveContact = async () => {
    if (!editContact) return;

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
      setIsEditing(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditContact(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!contactDetails) {
    return <div>Contact not found</div>;
  }

  if (isEditing && !editContact) {
    return <div>No contact to edit</div>;
  }

  return isEditing && editContact ? (
    <>
      <div ref={cardRef} className="contact-card">
        <div className="contact-edit-form">
          <div className="contact-edit-field">
            <label>Name</label>
            <input
              value={editContact.name}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  name: e.target.value,
                })
              }
            />
          </div>

          <div className="contact-edit-field">
            <label>Email</label>
            <input
              value={editContact.email}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  email: e.target.value,
                })
              }
            />
          </div>
          <div className="contact-edit-field">
            <label>Role</label>
            <select
              value={editContact.role}
              onChange={(e) =>
                setEditContact({
                  ...editContact,
                  role: e.target.value as Role,
                })
              }
            >
              <option value="Developer">Developer</option>
              <option value="Designer">Designer</option>
              <option value="Manager">Manager</option>
            </select>
          </div>

          <div className="contact-status">
            {editContact.favorite ? "⭐ Favorited" : "☆ Not Favorited"}
          </div>
          <div className="card-width">Card width: {cardWidth}</div>

          <div className="edit-actions">
            <button onClick={handleSaveContact}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      <Link to="/contacts" className="back-link">
        ← Back to contacts
      </Link>
      <div ref={cardRef} className="contact-card contact-details-view">
        <div className="contact-detail-row">
          <span className="contact-detail-label">Name</span>
          <span>{contactDetails.name}</span>
        </div>

        <div className="contact-detail-row">
          <span className="contact-detail-label">Email</span>
          <span>{contactDetails.email}</span>
        </div>

        <div className="contact-detail-row">
          <span className="contact-detail-label">Role</span>
          <span>{contactDetails.role}</span>
        </div>

        <div className="contact-status">
          {contactDetails.favorite ? "⭐ Favorited" : "☆ Not Favorited"}
        </div>

        <div className="card-width">Card width: {cardWidth}</div>

        <div className="contact-actions">
          <button className="edit-contact" onClick={handleEdit}>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
