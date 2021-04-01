import { configureStore } from '@reduxjs/toolkit';
import flatReducer from '../features/flat/flatSlice';

export default configureStore({
  reducer: {
    flat: flatReducer,
  },
});
