import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// масив моїх контактів
//https://66eb201255ad32cda47bc3db.mockapi.io/contacts

axios.defaults.baseURL = "https://connections-api.goit.global/";

// Створює і відправляє три екшени
// tasks/getAll/pending
// tasks/getAll/fulfilled
// tasks/getAll/rejected

export const fetchContacts = createAsyncThunk(
  "contacts/getAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get("/contacts");
      console.log(data);
      return data;
      // payload це і є response.data
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContacts, thunkAPI) => {
    try {
      const { data } = await axios.post("/contacts", newContacts);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const { data } = await axios.delete(`/contacts/${contactId}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// console.log(fetchContacts);
