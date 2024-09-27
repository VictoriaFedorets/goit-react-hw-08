// Слайс контактів
// У файлі contactsSlice.js оголоси слайс контактів, використовуючи функцію createSlice().
// Екшени слайса для використання в dispatch:
// addContact - додавання нового контакту до властивості items
// deleteContact - видалення контакту за id з властивості items
// Оголоси функції-селектори для використання в useSelector:
// selectContacts - повертає список контактів з властивості items.
// З файла слайса експортуй редюсер, а також його екшени і селектори.

import { createSelector, createSlice } from "@reduxjs/toolkit";
import { fetchContacts, addContact, deleteContact } from "./operations";
import { selectNameFilter } from "../filters/slice";

export const selectContacts = state => state.contacts.items;

const contactsSlice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: false,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(addContact.pending, state => {
        state.loading = true;
        state.error = false;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
        state.items = state.items.push(action.payload);
      })
      .addCase(deleteContact.pending, (state, action) => {
        state.loading = true;
        state.error = false;
      })

      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          contact => contact.id !== action.payload.id
        );
        state.loading = false;
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, filterName) => {
    const visibleContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filterName.toLowerCase())
    );
    return visibleContacts;
  }
);

export default contactsSlice.reducer;
