import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <ul className={css.homeText}>
      <li>Hello!</li>
      <li>Welcome to the phone book!</li>
      <li>
        A simple and convenient application for creating a personal contact
        book. You can add, remove, search for existing contacts by name.
      </li>
      <li>Register and keep your contacts safe with us!</li>
    </ul>
  );
}
