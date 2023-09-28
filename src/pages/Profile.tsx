import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const handleLogout = () => {
    localStorage.clear();
  };
  const rawStorage = localStorage.getItem('user');
  let storage;
  if (rawStorage) storage = JSON.parse(rawStorage);
  const user = storage.email;
  return (
    <>
      <div>
        <Header />
        <h2>Perfil</h2>
        <p data-testid="profile-email">
          {user}
        </p>
        <Link
          to="/done-recipes"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </Link>
        {' '}
        <Link
          to="/favorite-recipes"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </Link>
        {' '}
        <Link
          to="/"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          Logout

        </Link>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
