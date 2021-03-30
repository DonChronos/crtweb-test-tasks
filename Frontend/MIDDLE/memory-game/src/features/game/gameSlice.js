import { createSlice } from '@reduxjs/toolkit';
import shuffle from 'shuffle-array';
import { generateCardSet, getCard, cardsHaveIdenticalImages } from './cardFunctions';

export const gameSlice = createSlice({
  name: 'game',
  initialState: {
    turnNo: 1,
	pairsFound: 0,
	numClickWithinTurn: 0,
	firstId: undefined,
	secondId: undefined,
	gameStarted: false,
	gameComplete: false,
	cards: [],
  },
  reducers: {
	gameInit: {
		reducer: (state, action) => {
			console.log(action.payload);
			state.gameStarted = true;
			state.cards = action.payload;
		},
		prepare: () => {
			let cards = generateCardSet();
			cards = shuffle(cards);
			return { payload: cards };
		},
	},
	checkUnmatchedPair: state => {
		if (state.numClickWithinTurn === 2 && !cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
			state.numClickWithinTurn = 0;
			state.cards = state.cards.map(card => {
				if (state.firstId === card.id || state.secondId === card.id) {
					card.imageUp = false;
				}
				return card;
			});
			state.firstId = undefined;
			state.secondId = undefined;
			state.turnNo += 1;
		}
	},
	checkMatchedPair: state => {
		if (state.numClickWithinTurn === 2 && cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
			state.pairsFound += 1;
			state.gameComplete = false;
			if (state.pairsFound === state.cards.length / 2) {
				state.gameComplete = true;
			}
			state.turnNo += 1;
			state.numClickWithinTurn = 0;
			state.cards = state.cards.map(card => {
				if (state.firstId === card.id || state.secondId === card.id) {
					card.matched = true;
				}
				return card;
			})
		}
	},
	flipUpCard: (state, action) => {
		console.log(action);
		console.log(state);
		console.log({ key: state.cards });
		console.log(state.cards);
		let cards = state.cards;
		console.log(cards);
		let card = getCard(action.payload, state.cards);
		console.log(card);
		if (card.imageUp || card.matched) {
			return;
		}
		if (state.numClickWithinTurn === 2) {
			if (cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
			state.pairsFound += 1;
			state.gameComplete = false;
			if (state.pairsFound === state.cards.length / 2) {
				state.gameComplete = true;
			}
			state.turnNo += 1;
			state.numClickWithinTurn = 0;
			state.cards = state.cards.map(card => {
				if (state.firstId === card.id || state.secondId === card.id) {
					card.matched = true;
				}
				return card;
			});
			}
			if (state.numClickWithinTurn === 2 && !cardsHaveIdenticalImages(state.firstId, state.secondId, state.cards)) {
			state.numClickWithinTurn = 0;
			state.cards = state.cards.map(card => {
				if (state.firstId === card.id || state.secondId === card.id) {
					card.imageUp = false;
				}
				return card;
			});
			state.firstId = undefined;
			state.secondId = undefined;
			state.turnNo += 1;
			}
			state.firstId = action.payload;
			state.numClickWithinTurn = 1;
			state.cards = state.cards.map(card => {
				if (action.payload === card.id) {
					card.imageUp = true;
				}
				return card;
			});
		}
		let firstId = state.firstId;
		let secondId = state.secondId;
		if (state.numClickWithinTurn === 0) {
			firstId = action.payload;
		} else {
			secondId = action.payload;
		}
		state.firstId = firstId;
		state.secondId = secondId;
		state.numClickWithinTurn += 1;
		state.cards = state.cards.map(card => {
			if (action.payload === card.id) {
				card.imageUp = true;
			}
			return card;
		});
	},
  },
});

export const { gameInit, flipUpCard, checkMatchedPair, checkUnmatchedPair } = gameSlice.actions;
//export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
/*export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};
*/
// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
//export const selectCount = state => state.counter.value;

export const selectGameStarted = state => state.game.gameStarted;
export const selectGameComplete = state => state.game.gameComplete;
export const selectTurnNo = state => state.game.turnNo;
export const selectPairsFound = state => state.game.pairsFound;
export const selectCards = state => state.game.cards;

export default gameSlice.reducer;
