import Banner from 'pages/HomePage/components/Banner';
import GreatProduct from 'pages/HomePage/components/GreatProduct';
import Header from 'pages/HomePage/components/Header';
import Navbar from 'pages/HomePage/components/Navbar';
import Slidebar from 'pages/HomePage/components/Slidebar';
import React, { ReactElement } from 'react';

interface Props {}

export default function HomePage({}: Props): ReactElement {
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
		</div>
	);
}
