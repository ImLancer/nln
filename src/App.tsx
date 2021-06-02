//import from local
import './App.css';

//import react necessary
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import firebase
import { db, auth } from 'firebase.js';

//import redux
import { useDispatch } from 'react-redux';
import { logout, login } from 'features/user/userSlice';
import {
	AddProduct,
	AddNikeProduct,
	AddAdidasProduct,
	AddYeezyProduct,
	AddJordanProduct,
} from 'features/productList/productListSlice';

//import page
import ManagementPage from 'pages/ManagementPage';
import HomePage from 'pages/HomePage';
import Login from 'components/Login';
import Signup from 'components/Signup/index';

//import interface
import productEntry from 'interfaces/product/productEntry';

function App() {
	//khai bao useState

	//const user = useSelector(selectUser);
	const dispatch = useDispatch();

	//ket noi co so du lieu
	const ref = db.collection('products');

	//khai bao bien
	const listItems: productEntry[] = [];
	const adidasItems: productEntry[] = [];
	const nikeItems: productEntry[] = [];
	const yeezyItems: productEntry[] = [];
	const jordanItems: productEntry[] = [];
	let product: productEntry;

	//function
	const getProduct = () => {
		ref.get().then(async (item) => {
			const items = item.docs.map((doc) => {
				const {
					prodName,
					prodBrand,
					prodSize,
					prodPrice,
					prodUrlList,
					prodBought,
					prodDate,
					prodState,
					prodIsSale,
					prodSale,
					prodSalePrice,
				} = doc.data();

				product = {
					prodName: prodName,
					prodBrand: prodBrand,
					prodSize: prodSize,
					prodPrice: prodPrice,
					prodUrlList: [...prodUrlList],
					prodBought: prodBought,
					prodDate: prodDate,
					prodState: prodState,
					prodIsSale: prodIsSale,
					prodSale: prodSale,
					prodSalePrice: prodSalePrice,
				};

				listItems.push(product);

				if (product.prodBrand === 'Nike') {
					nikeItems.push(product);
				} else if (doc.data().prodBrand === 'Adidas') {
					adidasItems.push(product);
				} else if (doc.data().prodBrand === 'Yeezy') {
					yeezyItems.push(product);
				} else if (doc.data().prodBrand === 'Jordan') {
					jordanItems.push(product);
				}
			});

			await dispatch(AddProduct(listItems));
			await dispatch(AddNikeProduct(nikeItems));
			await dispatch(AddAdidasProduct(adidasItems));
			await dispatch(AddYeezyProduct(yeezyItems));
			await dispatch(AddJordanProduct(jordanItems));
		});
	};

	//useEffect su dung 1 lan
	useEffect(() => {
		getProduct();
	}, []);

	//useEffect su dung cho nhieu lan render
	useEffect(() => {
		const unsubcribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//login
				dispatch(login(userAuth.email.toString()));
			} else {
				//logout
				dispatch(logout);
			}
		});
	}, [dispatch]);

	return (
		<div className='App'>
			<Router>
				<Switch>
					<Route path='/' exact component={HomePage} />
					<Route path='/login' component={Login} />
					<Route path='/signup' component={Signup} />
					<Route path='/management' component={ManagementPage} />
				</Switch>
			</Router>
		</div>
	);
}

export default App;
