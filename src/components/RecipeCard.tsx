import { RecipeCardType } from '../utils/type/Type';

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
