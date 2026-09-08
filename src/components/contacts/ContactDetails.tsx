import { Link } from "react-router-dom";
import type { ContactDetailsProps, Role } from "./types";
import { useState, useLayoutEffect, useRef, useReducer  } from "react";
import useContact from "./hooks/useContact";
import {
  contactEditReducer,
  initialState,
} from "./reducers/contactEditReducer";

const ContactDetails = ({ contactID }: ContactDetailsProps) => {

  const [cardWidth, setCardWidth] = useState<number>(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const [editState, dispatch] = useReducer(
    contactEditReducer,
    initialState
  );

  const { isEditing, editContact } = editState;

  const { contactDetails, loading, error, updateContact } =
    useContact(contactID);

  useLayoutEffect(() => {
    if (!cardRef.current) return;

    const width = cardRef.current.getBoundingClientRect().width;

    setCardWidth(width);
  }, [contactDetails]);

  const handleSaveContact = async () => {

    if (!editContact) return;

    const updatedContact = await updateContact(editContact);
    if (!updatedContact) return;

    dispatch({
      type: "SAVE_SUCCESS"
    })

  };

  const handleEdit = () => {

    if (!contactDetails) return;

    dispatch({
      type: "START_EDIT",
      payload: contactDetails
    })
  };

  const handleCancelEdit = () => {

    dispatch ({
      type: "CANCEL_EDIT"
    })
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

                dispatch({
                  type: "UPDATE_CONTACT",
                  payload: {
                    ...editContact,
                    name: e.target.value,

                  }
                })
              }
            />
          </div>

          <div className="contact-edit-field">
            <label>Email</label>
            <input
              value={editContact.email}
              onChange={(e) =>

                dispatch({
                  type: "UPDATE_CONTACT",
                  payload: {
                    ...editContact,
                    email: e.target.value,

                  }
                })
              }
            />
          </div>
          <div className="contact-edit-field">
            <label>Role</label>
            <select
              value={editContact.role}
              onChange={(e) =>

                dispatch({
                  type: "UPDATE_CONTACT",
                  payload: {
                    ...editContact,
                    role: e.target.value as Role,
                  }
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
