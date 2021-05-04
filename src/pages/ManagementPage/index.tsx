import Navbar from 'pages/ManagementPage/components/Navbar';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import AddProduct from './components/AddProduct';

interface Props {}

const ManagementPage: React.FC<Props> = () => {
	return (
		<div>
			<Grid container xs={12} style={{ minHeight: '100vh' }}>
				<Grid item xs={3}>
					<Header />
					<Navbar />
				</Grid>
				<Grid item xs={9}>
					<AddProduct />
				</Grid>
			</Grid>
		</div>
	);
};

export default ManagementPage;
