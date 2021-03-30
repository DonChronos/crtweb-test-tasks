import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGameStarted,
  selectGameComplete,
  selectTurnNo,
  selectPairsFound,
  selectCards,
  gameInit,
} from './gameSlice';
import styles from './Game.module.css';
import GameStatusView from './GameStatusView';
import CardView from './cardView';

let timeOut = null;

export default function GameView() {
  const gameStarted = useSelector(selectGameStarted);
  const gameComplete = useSelector(selectGameComplete);
  const turnNo = useSelector(selectTurnNo);
  const pairsFound = useSelector(selectPairsFound);
  const cards = useSelector(selectCards);
  const dispatch = useDispatch();
  const onCardClicked = id => {
	  clearInterval(timeOut);
	  dispatch(flipUpCard(id));
	  dispatch(checkMatchedPair());
	  timeOut = setTimeout(() => {
		  dispatch(checkUnmatchedPair())
	  }, 5000);
  }
  
  const cardViews = cards.map(c => <CardView key={c.id}
											 id={c.id}
											 image={c.image}
											 imageUp={c.imageUp}
											 matched={c.matched}
											 onClick={onCardClicked} />
											 );
  
  let gameHUD = undefined;
  if (!gameStarted) {
	  gameHUD = <button onclick={() => dispatch(gameInit())}>Play</button>;
  } else {
	  gameHUD = <GameStatusView
					gameComplete={gameComplete}
					turnNo={turnNo}
					pairsFound={pairsFound}
				/>;
  }

  return (
	<div className={styles.game}>
		<header className={styles.game_header}>
			<div className={styles.game_title}>Game in React</div>
		</header>
		<div className={styles.game_status}>
			{gameHUD}
		</div>
		<div className={styles.card_container}>
			{cardViews}
		</div>
	</div>
  );
}
    /*<div>
      <div className={styles.game}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>*/
