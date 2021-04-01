import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectGameStarted,
  selectGameComplete,
  selectTurnNo,
  selectPairsFound,
  selectCards,
  selectNumClick,
  selectFirstId,
  selectSecondId,
  gameInit,
  flipUpCard,
  checkMatchedPair,
  checkUnmatchedPair,
} from './gameSlice';
import './Game.css';
import GameStatusView from './GameStatusView';
import CardView from './cardView';

let timeOut = null;

export default function GameView() {
  const gameStarted = useSelector(selectGameStarted);
  const gameComplete = useSelector(selectGameComplete);
  const turnNo = useSelector(selectTurnNo);
  const pairsFound = useSelector(selectPairsFound);
  const cards = useSelector(selectCards);
  const numClick = useSelector(selectNumClick);
  const firstId = useSelector(selectFirstId);
  const secondId = useSelector(selectSecondId);
  const dispatch = useDispatch();
  
  const onCardClicked = id => {
	  clearInterval(timeOut);
	  dispatch(flipUpCard({id, numClick, firstId, secondId, cards, pairsFound}));
	  console.log(numClick);
	  dispatch(checkMatchedPair({numClick, firstId, secondId, cards, pairsFound}));
	  timeOut = setTimeout(() => {
		  dispatch(checkUnmatchedPair({numClick, firstId, secondId, cards}))
	  }, 5000);
  }
  
  const getCardViews = () => cards.map(c => <CardView key={c.id}
											 id={c.id}
											 image={c.image}
											 imageUp={c.imageUp}
											 matched={c.matched}
											 onClick={onCardClicked} />
											 );
											 
  const cardViews = getCardViews();
  let gameHUD = undefined;
  if (!gameStarted) {
	  gameHUD = <button onClick={() => dispatch(gameInit())}>Play</button>;
  } else {
	  gameHUD = <GameStatusView
					gameComplete={gameComplete}
					turnNo={turnNo}
					pairsFound={pairsFound}
				/>;
  }

  return (
	<div className="game">
		<header className="game_header">
			<div className="game_title">Game in React</div>
		</header>
		<div className="game_status">
			{gameHUD}
		</div>
		<div className="card_container">
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
