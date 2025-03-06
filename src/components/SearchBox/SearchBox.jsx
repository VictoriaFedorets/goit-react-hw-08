import { useId } from "react";
import { selectNameFilter, changeFilter } from "../../redux/filters/slice.js";
import { useDispatch, useSelector } from "react-redux";

import css from "./SeachBox.module.css";
import WrapperForm from "../WrapperForm/WrapperForm.jsx";

export default function SearchBox() {
  const id = useId();
  const dispatch = useDispatch();

  const statusFilter = useSelector(selectNameFilter);

  const onFilter = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <WrapperForm>
      <label className={css.label} htmlFor={`${id}-find`}>
        Find contacts by name
        <input
          className={css.input}
          id={`${id}-find`}
          type="text"
          value={statusFilter}
          onChange={onFilter}
        />
      </label>
    </WrapperForm>
  );
}
