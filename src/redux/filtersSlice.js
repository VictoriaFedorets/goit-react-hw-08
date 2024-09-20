// Слайс фільтра
// У файлі filtersSlice.js оголоси слайс фільтра, використовуючи функцію createSlice().
// Екшени слайса для використання в dispatch:
// changeFilter - зміна значення фільтра в властивості name
// Оголоси функції-селектори для використання в useSelector:
// selectNameFilter - повертає значення фільтра з властивості name.
// З файла слайса експортуй редюсер, а також його екшени і селектори.

import { createSlice } from "@reduxjs/toolkit";

export const selectNameFilter = state => state.filters.name;

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    name: "",
  },
  reducers: {
    changeFilter(state, action) {
      return {
        ...state,
        name: action.payload,
      };
    },
  },
});

// Експортуємо фабрики екшенів
export const { changeFilter } = filtersSlice.actions;

// Експортуємо редюсер слайсу
export default filtersSlice.reducer;
