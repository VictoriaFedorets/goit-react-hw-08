import PageTitle from "../../components/PageTitle/PageTitle";

export default function HomePage() {
  return (
    <div>
      <PageTitle>
        Home
        <span role="img" aria-label="Greeting icon">
          💁‍♀️
        </span>
      </PageTitle>
      <p>Welcome to the phone book!</p>
      <p>
        This application is designed to create your contact book. Here you can
        create your contacts, delete them, sort them by name or phone number.
      </p>
      <p>
        To start working with the application you need to register. If you
        already have an account, please log in.🤩
      </p>
    </div>
  );
}
