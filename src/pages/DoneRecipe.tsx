import Footer from '../components/Footer';
import Header from '../components/Header';
import DoneRecipes from '../components/DoneRecipes';
import '../components/css/doneRecipes.css';

export default function DoneRecipe() {
  return (
    <div>
      <Header />
      <DoneRecipes />
      <Footer />
    </div>
  );
}
