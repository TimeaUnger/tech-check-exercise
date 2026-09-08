# React `useReducer` -- Contact Edit State

> **Goal:** Replace the related `isEditing` and `editContact` states in
> the `ContactDetails` component with a single `useReducer`.

------------------------------------------------------------------------

## 1. Starting point: two `useState` hooks

Originally, the edit mode was managed by two separate state values:

``` tsx
const [isEditing, setIsEditing] = useState<boolean>(false);
const [editContact, setEditContact] = useState<Contact | null>(null);
```

These two state values are related:

-   when editing starts, both values change;
-   when editing is cancelled, both values are reset;
-   after a successful save, both values are reset again.

### When is `useReducer` useful?

`useReducer` is useful when we have multiple **related state values**
and several clearly defined state transitions.

We should not use `useReducer` just because a component has more than
one state value.

------------------------------------------------------------------------

## 2. Creating the reducer state

We created:

``` text
components/
└── contacts/
    └── reducers/
        └── contactEditReducer.ts
```

First, we describe the shape of the state managed by the reducer:

``` ts
import type { Contact } from "../types";

interface EditState {
  isEditing: boolean;
  editContact: Contact | null;
}
```

### What do these properties mean?

-   `isEditing` -- tells us whether the component is currently in edit
    mode.
-   `editContact` -- contains the temporary editable copy of the
    `Contact`.
-   When we are not editing, `editContact` is `null`.

------------------------------------------------------------------------

## 3. `initialState` -- the starting state

``` ts
const initialState: EditState = {
  isEditing: false,
  editContact: null
};
```

When the page is opened:

``` text
isEditing   → false
editContact → null
```

This means that no contact is being edited yet.

------------------------------------------------------------------------

## 4. Actions -- what happened?

With a reducer, we do not directly change the state.

Instead, we **dispatch an action**.

``` ts
type EditAction =
  | { type: "START_EDIT"; payload: Contact }
  | { type: "CANCEL_EDIT" }
  | { type: "UPDATE_CONTACT"; payload: Contact }
  | { type: "SAVE_SUCCESS" };
```

### `type`

The `type` describes:

> **What happened?**

For example:

``` ts
type: "START_EDIT"
```

means that editing has started.

### `payload`

The `payload` contains the data required by the action.

For example:

``` ts
{
  type: "START_EDIT",
  payload: contactDetails
}
```

`START_EDIT` needs the contact data because those are the values we want
to edit.

`CANCEL_EDIT` does not need any additional data:

``` ts
{
  type: "CANCEL_EDIT"
}
```

The reducer already knows what state should be returned when editing is
cancelled.

### What does `|` mean?

In TypeScript, `|` is the **union operator**, which means **OR**.

``` ts
Contact | null
```

means:

> `Contact` OR `null`

The same idea is used for `EditAction`: an action can be **one of** the
listed object shapes.

------------------------------------------------------------------------

## 5. The reducer function

The reducer receives:

``` text
current state + action
          ↓
       new state
```

Our complete reducer:

``` ts
const contactEditReducer = (
  state: EditState,
  action: EditAction,
): EditState => {
  switch (action.type) {
    case "START_EDIT":
      return {
        isEditing: true,
        editContact: action.payload
      };

    case "CANCEL_EDIT":
      return {
        isEditing: false,
        editContact: null
      };

    case "UPDATE_CONTACT":
      return {
        ...state,
        editContact: action.payload
      };

    case "SAVE_SUCCESS":
      return {
        isEditing: false,
        editContact: null
      };
  }
};

export { contactEditReducer, initialState };
```

------------------------------------------------------------------------

## 6. `START_EDIT`

``` ts
case "START_EDIT":
  return {
    isEditing: true,
    editContact: action.payload
  };
```

When the user clicks **Edit**:

-   `isEditing` becomes `true`;
-   `editContact` receives the current contact data.

Example:

``` text
before:

{
  isEditing: false,
  editContact: null
}

after START_EDIT:

{
  isEditing: true,
  editContact: contactDetails
}
```

------------------------------------------------------------------------

## 7. `CANCEL_EDIT`

``` ts
case "CANCEL_EDIT":
  return {
    isEditing: false,
    editContact: null
  };
```

When editing is cancelled:

-   we leave edit mode;
-   we discard the temporary edited contact.

This is why unsaved changes disappear after clicking **Cancel**.

------------------------------------------------------------------------

## 8. `UPDATE_CONTACT` and `...state`

``` ts
case "UPDATE_CONTACT":
  return {
    ...state,
    editContact: action.payload
  };
```

`...state` copies the reducer's **current state**.

For example:

``` ts
{
  isEditing: true,
  editContact: oldContact
}
```

Then:

``` ts
editContact: action.payload
```

overwrites only `editContact`.

The result is:

``` ts
{
  isEditing: true,
  editContact: updatedContact
}
```

So `isEditing` is preserved.

If we returned only:

``` ts
return {
  editContact: action.payload
};
```

then `isEditing` would be missing from the new state.

------------------------------------------------------------------------

## 9. `SAVE_SUCCESS`

``` ts
case "SAVE_SUCCESS":
  return {
    isEditing: false,
    editContact: null
  };
```

This action means:

> The contact has already been saved successfully to the server.

The reducer then only resets the UI state:

``` text
isEditing   → false
editContact → null
```

------------------------------------------------------------------------

## 10. Connecting `useReducer` to `ContactDetails`

Imports:

``` tsx
import { useState, useLayoutEffect, useRef, useReducer } from "react";

import {
  contactEditReducer,
  initialState,
} from "./reducers/contactEditReducer";
```

Instead of the old state:

``` tsx
const [isEditing, setIsEditing] = useState<boolean>(false);
const [editContact, setEditContact] = useState<Contact | null>(null);
```

we use:

``` tsx
const [editState, dispatch] = useReducer(
  contactEditReducer,
  initialState
);
```

Then we destructure the state:

``` tsx
const { isEditing, editContact } = editState;
```

### What does `useReducer` return?

``` tsx
const [editState, dispatch] = useReducer(...)
```

-   `editState` → the current reducer state
-   `dispatch` → sends actions to the reducer

------------------------------------------------------------------------

## 11. Edit -- dispatching `START_EDIT`

``` tsx
const handleEdit = () => {
  if (!contactDetails) return;

  dispatch({
    type: "START_EDIT",
    payload: contactDetails
  });
};
```

### Why do we need this check?

``` tsx
if (!contactDetails) return;
```

The type of `contactDetails` is:

``` ts
Contact | null
```

But the `START_EDIT` payload requires:

``` ts
Contact
```

Therefore, we first make sure that `contactDetails` is not `null`.

After the check, TypeScript knows that:

``` text
contactDetails → Contact
```

This is called **type narrowing**.

------------------------------------------------------------------------

## 12. Cancel -- dispatching `CANCEL_EDIT`

``` tsx
const handleCancelEdit = () => {
  dispatch({
    type: "CANCEL_EDIT"
  });
};
```

No payload is required.

The reducer already knows that this action should return:

``` ts
{
  isEditing: false,
  editContact: null
}
```

------------------------------------------------------------------------

## 13. Save -- separating API logic from reducer logic

``` tsx
const handleSaveContact = async () => {
  if (!editContact) return;

  const updatedContact = await updateContact(editContact);
  if (!updatedContact) return;

  dispatch({
    type: "SAVE_SUCCESS"
  });
};
```

The flow is:

``` text
Save
  ↓
updateContact(editContact)
  ↓
API / server update
  ↓
successful?
  ↓ yes
dispatch({ type: "SAVE_SUCCESS" })
  ↓
reducer
  ↓
isEditing: false
editContact: null
```

### Why don't we put `fetch` inside the reducer?

A reducer should be a **pure function**.

Its responsibility is:

``` text
(state, action) → newState
```

We should not put side effects such as:

``` ts
fetch(...)
localStorage.setItem(...)
```

inside the reducer.

In our project:

``` text
useContact custom hook
        ↓
API / fetch / server data

contactEditReducer
        ↓
edit UI state
```

------------------------------------------------------------------------

## 14. Updating an input -- `UPDATE_CONTACT`

### Name

``` tsx
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
```

`...editContact` copies all current properties of the contact.

Then:

``` tsx
name: e.target.value
```

overwrites only the `name`.

Example:

``` ts
{
  id: "1",
  name: "Anna",
  email: "anna@test.com",
  role: "Developer",
  favorite: true
}
```

If the new name is `Anna Kovács`, then:

``` ts
{
  ...editContact,
  name: "Anna Kovács"
}
```

results in:

``` ts
{
  id: "1",
  name: "Anna Kovács",
  email: "anna@test.com",
  role: "Developer",
  favorite: true
}
```

------------------------------------------------------------------------

## 15. Email

``` tsx
dispatch({
  type: "UPDATE_CONTACT",
  payload: {
    ...editContact,
    email: e.target.value,
  }
});
```

The other contact properties are preserved and only the email is
changed.

------------------------------------------------------------------------

## 16. Role

``` tsx
dispatch({
  type: "UPDATE_CONTACT",
  payload: {
    ...editContact,
    role: e.target.value as Role,
  }
});
```

`as Role` is still needed because `role` is not just any `string`; it
uses our custom `Role` type.

------------------------------------------------------------------------

## 17. Complete data flow

``` text
Edit button
    ↓
dispatch({
  type: "START_EDIT",
  payload: contactDetails
})
    ↓
reducer
    ↓
{
  isEditing: true,
  editContact: contactDetails
}
    ↓
React re-render
    ↓
user changes an input
    ↓
dispatch({
  type: "UPDATE_CONTACT",
  payload: modifiedContact
})
    ↓
reducer updates editContact
    ↓
React re-render
    ↓
Save
    ↓
updateContact(editContact)
    ↓
API update
    ↓
SAVE_SUCCESS
    ↓
{
  isEditing: false,
  editContact: null
}
```

------------------------------------------------------------------------

## 18. What does `dispatch` do?

`dispatch` sends an action to the reducer.

For example:

``` tsx
dispatch({
  type: "START_EDIT",
  payload: contactDetails
});
```

The action tells us:

``` text
type    → what happened?
payload → what data is needed?
```

The reducer then uses the current state and the action to calculate the
new state.

------------------------------------------------------------------------

## 19. Why did `useReducer` make sense here?

We have two related state values:

``` text
isEditing
editContact
```

and several events modify them:

``` text
START_EDIT
CANCEL_EDIT
UPDATE_CONTACT
SAVE_SUCCESS
```

The reducer centralizes the logic for these state transitions.

### Important

We do not use `useReducer` simply because there are multiple state
values.

If several state values are simple and independent, `useState` is
usually still the better choice.

------------------------------------------------------------------------

## 20. Short interview answer

> **I use `useReducer` when I have complex state logic or multiple
> related state values. It centralizes state transitions in a reducer
> and actions describe what happened. Reducers should stay pure, so side
> effects such as API calls are handled outside the reducer.**

------------------------------------------------------------------------

## 21. Quick review questions

### What does `dispatch` do?

It sends an action to the reducer. The action describes what happened
and can also contain a payload when additional data is required.

### What is the reducer's responsibility?

It receives the current state and an action and returns the next state.

### Why does `START_EDIT` need a payload?

Because we need the `Contact` data that will be edited.

### Why doesn't `CANCEL_EDIT` need a payload?

Because no new data is required. The reducer already knows that it
should return `isEditing: false` and `editContact: null`.

### Why do we use `...state` in `UPDATE_CONTACT`?

To preserve the other values in the reducer state while replacing only
`editContact`.

### Why don't we make API calls inside the reducer?

Because a reducer should be a pure function. `fetch` is a side effect,
so API logic belongs outside the reducer.

------------------------------------------------------------------------

## Summary

``` text
useReducer
│
├── state
│   ├── isEditing
│   └── editContact
│
├── actions
│   ├── START_EDIT
│   ├── CANCEL_EDIT
│   ├── UPDATE_CONTACT
│   └── SAVE_SUCCESS
│
├── dispatch
│   └── sends the action
│
└── reducer
    └── state + action → new state
```
