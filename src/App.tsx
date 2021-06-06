//import from local
import './App.css';

//import react necessary
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HashLoader from 'react-spinners/HashLoader';

//import firebase
import { db, auth } from 'firebase.js';

//import cho matirial ui
import Grid from '@material-ui/core/Grid';

//import redux
import { useDispatch, useSelector } from 'react-redux';
import { logout, login, AddUserDetail, RemoveUserDetail } from 'features/user/userSlice';
import { Add, selectAccount } from 'features/accountList/accountListSlice';
import {
	AddProduct,
	AddSortProduct,
	AddNikeProduct,
	AddAdidasProduct,
	AddYeezyProduct,
	AddJordanProduct,
	selectProduct,
	selectAdidas,
	selectNike,
	selectYeezy,
	selectJordan,
} from 'features/productList/productListSlice';

//import page
import CardPage from 'pages/CardPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import MainPage from 'pages/MainPage';
import ProductDetail from 'pages/ProductDetail';
import ProductPage from 'pages/ProductPage';
import ManagementPage from 'pages/ManagementPage';
import Login from 'components/Login';
import Signup from 'components/Signup/index';

//import interface
import productEntry from 'interfaces/product/productEntry';
import accountEntry from 'interfaces/account/accountEntry';

function App() {
	//khai bao useState
	const [loading, setLoading] = useState<boolean | undefined>(false);
	const accounts: accountEntry[] = useSelector(selectAccount);

	//const user = useSelector(selectUser);
	const dispatch = useDispatch();

	//ket noi co so du lieu product
	const ref = db.collection('products');

	//khai bao bien product
	const listItems: productEntry[] = [];
	const adidasItems: productEntry[] = [];
	const nikeItems: productEntry[] = [];
	const yeezyItems: productEntry[] = [];
	const jordanItems: productEntry[] = [];
	let product: productEntry;

	//function
	const getProduct = () => {
		setLoading(true);
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
					prodNameSale,
					prodSale,
					prodSalePrice,
				} = doc.data();

				const { id } = doc;

				product = {
					prodId: id,
					prodName: prodName,
					prodBrand: prodBrand,
					prodSize: prodSize,
					prodPrice: prodPrice,
					prodUrlList: prodUrlList,
					prodBought: prodBought,
					prodDate: prodDate,
					prodState: prodState,
					prodIsSale: prodIsSale,
					prodNameSale: prodNameSale,
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

			const sortListItems = await listItems.sort((a, b) => {
				return b.prodBought - a.prodBought;
			});

			await dispatch(AddProduct(listItems));
			await dispatch(AddSortProduct(sortListItems));
			await dispatch(AddNikeProduct(nikeItems));
			await dispatch(AddAdidasProduct(adidasItems));
			await dispatch(AddYeezyProduct(yeezyItems));
			await dispatch(AddJordanProduct(jordanItems));
			await setLoading(false);
		});
	};

	//ket noi co so du lieu accounts
	const refAcc = db.collection('accounts');

	//khai bao bien account
	let account: accountEntry;
	const listAccount: accountEntry[] = [];

	const getAccount = () => {
		setLoading(true);
		refAcc.get().then(async (item) => {
			const items = item.docs.map((doc) => {
				const {
					accountAddress,
					accountBirthday,
					accountMail,
					accountPhone,
					accountPoint,
					accountSex,
					accountType,
					accountUsername,
				} = doc.data();

				const { id } = doc;

				account = {
					accountId: id,
					accountAddress: accountAddress,
					accountBirthday: accountBirthday,
					accountMail: accountMail,
					accountPhone: accountPhone,
					accountPoint: accountPoint,
					accountSex: accountSex,
					accountType: accountType,
					accountUsername: accountUsername,
				};

				listAccount.push(account);
			});

			await dispatch(Add(listAccount));
			await setLoading(false);
		});
	};

	useEffect(() => {
		getProduct();
		getAccount();
	}, []);

	//useEffect checkout user
	useEffect(() => {
		const unsubcribe = auth.onAuthStateChanged((userAuth) => {
			if (userAuth) {
				//login
				dispatch(login(userAuth.email.toString()));
				let userDetail = accounts.find((acc) => acc.accountMail === userAuth.email.toString());
				dispatch(AddUserDetail(userDetail));
			} else {
				//logout
				dispatch(logout);
				dispatch(RemoveUserDetail());
			}
		});
	}, [dispatch]);

	//get all list product
	const productList: productEntry[] = useSelector(selectProduct);
	const adidasList: productEntry[] = useSelector(selectAdidas);
	const nikeList: productEntry[] = useSelector(selectNike);
	const yeezyList: productEntry[] = useSelector(selectYeezy);
	const jordanList: productEntry[] = useSelector(selectJordan);

	return (
		<div className='App' style={{ width: '100%', overflowX: 'hidden' }}>
			{loading ? (
				<Grid
					xs={12}
					container
					justify='center'
					alignItems='center'
					style={{
						height: '100vh',
						backgroundImage: `url('https://wallpaperaccess.com/full/30100.jpg')`,
						backgroundSize: 'cover',
						backgroundPosition: 'center center',
					}}
				>
					<HashLoader size={80} loading={loading} color='#ffb300' />
				</Grid>
			) : (
				<Router>
					<Switch>
						{/*route Main */}
						<Route path='/' exact>
							{/*Header */}
							<Header />

							{/*Middle */}
							<MainPage />

							{/*Footer */}
							<Footer />
						</Route>

						{/*route Card */}
						<Route path='/card' exact>
							{/*Header */}
							<Header />

							{/*Middle */}
							<CardPage />

							{/*Footer */}
							<Footer />
						</Route>

						{/*route Product */}
						<Route path='/product/:type' exact>
							{/*Header */}
							<Header />

							{/*Middle */}
							<Switch>
								<Route path='/product/products'>
									<ProductPage products={productList} />
								</Route>
								<Route path='/product/adidas'>
									<ProductPage products={adidasList} />
								</Route>
								<Route path='/product/nike'>
									<ProductPage products={nikeList} />
								</Route>
								<Route path='/product/yeezy'>
									<ProductPage products={yeezyList} />
								</Route>
								<Route path='/product/jordan'>
									<ProductPage products={jordanList} />
								</Route>
							</Switch>
							{/*Footer */}
							<Footer />
						</Route>

						{/*route product detail */}
						<Route path='/detail/:id' exact>
							{/*Header */}
							<Header />

							{/*Middle */}
							<Route path='/detail/:id'>
								<ProductDetail />
							</Route>

							{/*Footer */}
							<Footer />
						</Route>

						<Route path='/login' exact component={Login} />
						<Route path='/signup' exact component={Signup} />
						<Route path='/management' exact component={ManagementPage} />
					</Switch>
				</Router>
			)}
		</div>
	);
}

export default App;
