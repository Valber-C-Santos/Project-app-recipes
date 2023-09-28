import { IngredientType } from '../../utils/type/Type';

type IngredientListItemProps = {
  ingr: IngredientType;
  index: number;
};

export default function IngrRender({ ingr, index }:IngredientListItemProps) {
  return (
    <li
      data-testid={ `${index}-ingredient-name-and-measure` }
      key={ index }
    >
      <p>
        Ingredient:
        { ingr.ingredient }
      </p>
      <p>
        Measure:
        { ingr.measure }
      </p>
    </li>
  );
}
