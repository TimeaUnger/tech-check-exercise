export interface Contact {
  id: number;
  name: string;
  email: string;
  favorite: boolean;
}

export interface ContactListProps {
  contacts: Contact[];
  handleToggleFavorite: (id: number) => void;
  handleDelete: (id: number) => void;
}

export interface ContactCardProps {
  contact: Contact;
  onToggleFavorite: (id: number) => void;
  onDelete: (id: number) => void;
}

export interface ContactFormProps {
    onAddContact: (newContact: Contact) => void;
}