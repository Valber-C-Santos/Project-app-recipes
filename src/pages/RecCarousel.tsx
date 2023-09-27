import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Stack } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../components/Reducers/reducers';

export default function RecCarousel({ type, data }:any) {
  const [cutData, setCutData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  // let cutData;
  function groupArrayIntoPairs(array:any) {
    const pairs = [];
    for (let i = 0; i < array.length; i += 2) {
      const pair = [array[i], array[i + 1]];
      pairs.push(pair);
    }
    return pairs;
  }

  function insertIndex(array:any) {
    for (let i = 0; i < array.length; i++) {
      array[i].index = i;
    }
    return array;
  }

  const indexedData = insertIndex(cutData);
  const pairs = groupArrayIntoPairs(indexedData);
  // console.log(pairs);

  useEffect(() => {
    if (data) {
      setIsLoading(true);
      let cutDataTemp;
      if (data && type === 'meals') cutDataTemp = data.drinks.slice(0, 6);
      if (data && type === 'drinks') cutDataTemp = data.meals.slice(0, 6);
      // console.log('cutdatatemp: ', cutDataTemp);
      setCutData(cutDataTemp);
      setIsLoading(false);
    }
  }, [data]);
  // const pairs = groupIntoPairs(data);
  // console.log(pairs);

  return (
    <div>
      <Carousel>
        {!isLoading && type === 'meals'
        && pairs && pairs.map((pair: any[], index: number) => (
          <Carousel.Item key={ index }>
            <div className="hstack gap-2 col-md-5 mx-auto">
              {pair.map((item: any) => (
                <img
                  data-testid={ `${item.index}-recommendation-card` }
                  key={ item.strDrink }
                  className="d-block w-50 mx-auto"
                  src={ item.strDrinkThumb }
                  alt={ item.strDrink }
                />
              ))}
            </div>
            <Carousel.Caption>
              <h3
                data-testid={ `${pair[0].index}-recommendation-title` }
              >
                {pair[0].strDrink}
              </h3>
              <h3
                data-testid={ `${pair[1].index}-recommendation-title` }
              >
                {pair[1].strDrink}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        {!isLoading && type === 'drinks'
        && pairs && pairs.map((pair: any[], index: number) => (
          <Carousel.Item key={ index }>
            <div className="hstack gap-2 col-md-5 mx-auto">
              {pair.map((item: any) => (
                <img
                  data-testid={ `${item.index}-recommendation-card` }
                  key={ item.strMeal }
                  className="d-block w-50 mx-auto"
                  src={ item.strMealThumb }
                  alt={ item.strMeal }
                />
              ))}
            </div>
            <Carousel.Caption>
              <h3
                data-testid={ `${pair[0].index}-recommendation-title` }
              >
                {pair[0].strMeal}
              </h3>
              <h3
                data-testid={ `${pair[1].index}-recommendation-title` }
              >
                {pair[1].strMeal}
              </h3>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
