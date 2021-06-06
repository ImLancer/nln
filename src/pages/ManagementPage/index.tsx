import Navbar from 'pages/ManagementPage/components/Navbar';
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './components/Header';
import AddProduct from './components/AddProduct';
import HashLoader from 'react-spinners/HashLoader';

interface Props {}

const ManagementPage: React.FC<Props> = () => {
	const [loading, setLoading] = useState<boolean | undefined>(false);

	const handleLoading = (stateLoad: boolean) => {
		setLoading(stateLoad);
	};

	return (
		<div>
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
				<Grid container xs={12} style={{ minHeight: '100vh', overflowY: 'hidden' }}>
					{}
					<Grid item xs={3}>
						<Header />
						<Navbar />
					</Grid>
					<Grid item xs={9}>
						<AddProduct handleLoading={handleLoading} />
					</Grid>
				</Grid>
			)}
		</div>
	);
};

export default ManagementPage;
