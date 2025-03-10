import css from "./HomePage.module.css";

export default function HomePage() {
  return (
    <ul className={css.homeText}>
      <li>Hello!</li>
      <li>Welcome to the phone book!</li>
      <li>
        It is a digital contact book that allows you to store important
        information about your connections in one convenient place.
      </li>
      <li>
        There is an active and live environment where you can find the right
        contact, add a new one, or edit existing data.
      </li>
      <li>Register and keep your contacts safe with us!</li>
    </ul>
  );
}
