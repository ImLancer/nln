import React, { useEffect } from 'react';
import './App.css';
import { auth } from 'firebase.js';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { logout, login, selectUser } from 'features/user/userSlice';
import ManagementPage from 'pages/ManagementPage';
import HomePage from 'pages/HomePage';
import Login from 'components/Login';
import Signup from 'components/Signup/index';

function App() {
	const user = useSelector(selectUser);
	const dispatch = useDispatch();

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
			{/* <Login /> */}
			{/* <ManagementPage /> */}
		</div>
	);
}

export default App;
