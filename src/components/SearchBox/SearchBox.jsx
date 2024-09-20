import { useId } from "react";
import css from "./SeachBox.module.css";
import { selectNameFilter, changeFilter } from "../../redux/filtersSlice.js";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBox() {
  const id = useId();
  const dispatch = useDispatch();

  const statusFilter = useSelector(selectNameFilter);

  const onFilter = event => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <div className={css.searchBox}>
      <label htmlFor={`${id}-find`}>Find contacts by name</label>
      <input
        className={css.seachInput}
        id={`${id}-find`}
        type="text"
        value={statusFilter}
        onChange={onFilter}
      />
    </div>
  );
}
