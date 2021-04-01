import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'; 

export const flatSlice = createSlice({
  name: 'flat',
  initialState: {
    flats: [],
  },
  reducers: {
    increment: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
	receiveList: (state, action) => {
		console.log(action);
		state.flats = action.payload;
	}
  },
});

export const test = 'test';

const receiveList = flatSlice.actions.receiveList;

export const getFlatsAsync = () => (dispatch = useDispatch()) => {
	(async () => {
		try {
			let response = await fetch('entities.json');
			console.log(response);
			console.log(receiveList);
			if (response.ok) {
				let data = await response.json();
				dispatch(receiveList(data.response));
			} else {
				console.log('Error' + response.status);
			}
		} catch (e) {
			console.log(e)
		}
	})();
}

/*export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
*/
export default flatSlice.reducer;
