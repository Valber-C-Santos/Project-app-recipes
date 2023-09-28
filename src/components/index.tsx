export default function Header() {
  return (
    <header>
      <img
        data-testid="profile-top-btn"
        src="../images/profileIcon.svg"
        alt="profile icon"
      />
      <img
        data-testid="profile-top-btn"
        src="../images/searchIcon.svg"
        alt="search icon"
      />
      <title data-testid="page-title">
        Recipes App
      </title>
    </header>
  );
}
