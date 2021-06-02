import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from 'features/counter/counterSlice';
import userReducer from 'features/user/userSlice';
import productListReducer from 'features/productList/productListSlice';
import accountListReducer from 'features/accountList/accountListSlice';

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		user: userReducer,
		productList: productListReducer,
		accountList: accountListReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
