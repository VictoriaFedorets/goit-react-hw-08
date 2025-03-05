import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

import css from "./Navigation.module.css";

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <nav>
      <Link className={css.link} to="/">
        Home
      </Link>
      {isLoggedIn && (
        <Link className={css.link} to="/contacts">
          Contacts
        </Link>
      )}
    </nav>
  );
}
