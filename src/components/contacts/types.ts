export type Role = "Developer" | "Designer" | "Manager";

export interface Contact {
  id: string;
  name: string;
  email: string;
  favorite: boolean;
  role: Role
}

export interface ContactListProps {
  contacts: Contact[];
  handleToggleFavorite: (id: string) => void;
  handleDelete: (id: string) => void;
}

export interface ContactCardProps {
  contact: Contact;
  onToggleFavorite: (id: string) => void;
  onDelete: (id: string) => void;
}

export interface ContactFormProps {
    onAddContact: (newContact: Contact) => void;
}

export interface ContactDetailsProps {
  contactID: string;
}
