import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function DoneRecipesCard({ value, index }: any) {
  const [compyMessage, setCompyMessage] = useState<string>();
  const { tags, nationality, category, image, type,
    name, doneDate, alcoholicOrNot, id } = value;
  const url = `http://localhost:3000/${type}s/${id}`;

  const handleClickShare = async () => {
    await navigator.clipboard.writeText(url);
    console.log(url);

    setCompyMessage('Link copied!');
    setTimeout(() => {
      setCompyMessage('');
    }, 3000);
  };

  if (type === 'meal') {
    return (
      <div>
        <Link to={ url }>
          <img src={ image } alt="" data-testid={ `${index}-horizontal-image` } />
        </Link>
        <Link to={ url }>
          <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
        </Link>
        {compyMessage === 'Link copied!' ? <p>Link copied!</p> : <p />}

        <p data-testid={ `${index}-horizontal-top-text` }>
          {`${nationality} - ${category}`}
        </p>
        <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>

        <button
          onClick={ () => handleClickShare() }
        >
          <img
            alt="button share"
            src={ shareIcon }
            data-testid={ `${index}-horizontal-share-btn` }
          />
        </button>

        {tags.map((item:string) => (
          <p key={ item } data-testid={ `${index}-${item}-horizontal-tag` }>{item}</p>))}

      </div>
    );
  }
  return (
    <div>
      <Link to={ url }>
        <img src={ image } alt="" data-testid={ `${index}-horizontal-image` } />
        <h2 data-testid={ `${index}-horizontal-name` }>{name}</h2>
      </Link>

      <p data-testid={ `${index}-horizontal-done-date` }>{doneDate}</p>
      <p data-testid={ `${index}-horizontal-top-text` }>
        {alcoholicOrNot}
      </p>

      <button
        onClick={ handleClickShare }
      >
        <img
          data-testid={ `${index}-horizontal-share-btn` }
          alt="button share"
          src={ shareIcon }
        />
      </button>

    </div>
  );
}

export default DoneRecipesCard;
