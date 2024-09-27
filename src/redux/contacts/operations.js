import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// масив моїх контактів
//https://66eb201255ad32cda47bc3db.mockapi.io/contacts

axios.defaults.baseURL = "https://66eb201255ad32cda47bc3db.mockapi.io";

// Створює і відправляє три екшени
// tasks/getAll/pending
// tasks/getAll/fulfilled
// tasks/getAll/rejected

export const fetchContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      console.log(response);
      return response.data;
      // payload це і є response.data
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContacts, thunkAPI) => {
    try {
      const res = await axios.post("/contacts", newContacts);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const res = await axios.delete(`/contacts/${contactId}`);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue();
    }
  }
);

// console.log(fetchContacts);
