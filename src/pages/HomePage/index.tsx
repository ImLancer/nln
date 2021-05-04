import Banner from 'pages/HomePage/components/Banner';
import GreatProduct from 'pages/HomePage/components/GreatProduct';
import Header from 'pages/HomePage/components/Header';
import Navbar from 'pages/HomePage/components/Navbar';
import Slidebar from 'pages/HomePage/components/Slidebar';
import React, { ReactElement } from 'react';
import Footer from './components/Footer/index';
import UnitProduct from './components/UnitProduct/index';
import ReverseUnitProduct from './components/ReverseUnitProduct/index';
import { makeStyles } from '@material-ui/core/styles';

interface Props {}

const useStyles = makeStyles({
	unitProduct: {
		marginTop: '40px',
	},
});

export default function HomePage({}: Props): ReactElement {
	const classes = useStyles();

	return (
		<div>
			{/*Header */}
			<Header />

			{/*NavBar*/}
			<Navbar />

			{/*Banner*/}
			<Banner />

			{/*Slidebar*/}
			<Slidebar />

			{/*San pham noi bat*/}
			<GreatProduct />

			{/*Adidas product */}
			<UnitProduct />

			{/*Nike product */}
			<ReverseUnitProduct />

			{/*Vans Product */}
			<UnitProduct />

			{/*Footer */}
			<Footer />
		</div>
	);
}
