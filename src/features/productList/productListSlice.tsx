import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

import firebase, { db, app, auth } from 'firebase.js';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface productList {
	list: productEntry[];
	listNike: productEntry[];
	listAdidas: productEntry[];
	listYeezy: productEntry[];
	listJordan: productEntry[];
}

const initialState: productList = {
	list: [],
	listNike: [],
	listAdidas: [],
	listYeezy: [],
	listJordan: [],
};

export const productListSlice = createSlice({
	name: 'productList',
	initialState,
	reducers: {
		AddProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.list = action.payload;
		},
		AddNikeProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listNike = action.payload;
		},
		AddAdidasProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listAdidas = action.payload;
		},
		AddYeezyProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listYeezy = action.payload;
		},
		AddJordanProduct: (state, action: PayloadAction<productEntry[]>) => {
			state.listJordan = action.payload;
		},
		// logout: (state) => {
		// 	state.user = '';
		// },
	},
});

export const { AddProduct, AddNikeProduct, AddAdidasProduct, AddYeezyProduct, AddJordanProduct } =
	productListSlice.actions;

export const selectProduct = (state: RootState) => state.productList.list;
export const selectNike = (state: RootState) => state.productList.listNike;
export const selectAdidas = (state: RootState) => state.productList.listAdidas;
export const selectYeezy = (state: RootState) => state.productList.listYeezy;
export const selectJordan = (state: RootState) => state.productList.listJordan;

export default productListSlice.reducer;
