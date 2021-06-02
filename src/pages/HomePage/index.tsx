//import necessary for react
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import page
import Header from 'pages/HomePage/components/Header';
import Navbar from 'pages/HomePage/components/Navbar';
import Footer from './components/Footer/index';
import MainPage from 'pages/MainPage';
import ProductPage from 'pages/ProductPage';

interface Props {}

export default function HomePage({}: Props): ReactElement {
	return (
		<div>
			<Router>
				{/*Header */}
				<Header />

				{/*NavBar*/}
				<Navbar />

				<Switch>
					<Route path='/' exact component={MainPage} />
					<Route path='/productpage' component={ProductPage} />
					{/* <Route path='/signup' component={Signup} />
					<Route path='/management' component={ManagementPage} /> */}
				</Switch>

				{/*Footer */}
				<Footer />
			</Router>
		</div>
	);
}
