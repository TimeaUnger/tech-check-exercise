import type { Contact } from "../types";

interface EditState {
  isEditing: boolean;
  editContact: Contact | null;
}


const initialState: EditState = {
    isEditing: false,
    editContact: null
}

type EditAction = 
| { type: "START_EDIT", payload: Contact }
| { type: "CANCEL_EDIT" }
| { type: "UPDATE_CONTACT", payload: Contact }
| { type: "SAVE_SUCCESS" }

const contactEditReducer = (
  state: EditState,
  action: EditAction,
): EditState => {

  switch (action.type) {
    case "START_EDIT":

    return {
      isEditing: true,
      editContact: action.payload
    }

    case "CANCEL_EDIT":

    return {
      isEditing: false,
      editContact: null
    }

    case "UPDATE_CONTACT":

    return {
      ...state,
      editContact: action.payload
    }

    case "SAVE_SUCCESS":

    return {
      isEditing: false,
      editContact: null
    }
  }
};

export { contactEditReducer, initialState };