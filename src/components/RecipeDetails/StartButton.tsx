export default function StartButton(isInProgress: any) {
  return (
    <button id="start-recipe-btn" data-testid="start-recipe-btn">
      {isInProgress ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}
