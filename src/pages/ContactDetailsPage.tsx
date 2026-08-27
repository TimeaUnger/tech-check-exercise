import { useParams } from "react-router-dom";
import ContactDetails from "../components/contacts/ContactDetails";

const ContactDetailsPage = () => {
  const { id } = useParams();

  if (!id) {
    return <div>Contact not found</div>;
  }

  return <ContactDetails contactID={id} />;
};

export default ContactDetailsPage;
