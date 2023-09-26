import Footer from '../components/Footer';
import Header from '../components/Header';

export default function Meals() {
    
  return (
    <div>
      <Header />
      <h1>Recipe Details</h1>
      <div>

      </div>
      <Footer />
    </div>
  );
}

export function RecipeCard({ index, img, name }:RecipeCardType) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img
        width="360px"
        src={ img }
        alt={ name }
        data-testid={ `${index}-card-img` }
      />
      <h2 data-testid={ `${index}-card-name` }>{name}</h2>
    </div>
  );
}
