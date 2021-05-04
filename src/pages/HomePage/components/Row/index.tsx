import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Product from 'pages/HomePage/components/Product';

const useStyles = makeStyles({
	rowItem: {
		padding: '5px',
	},
	item: {
		marginTop: '10px',
	},
});

interface Props {
	amount: number;
}

export interface testProduct {
	imageUrl: string;
	title: string;
	price: number;
}

const Row: React.FC<Props> = ({ amount }) => {
	const classes = useStyles();

	let testProductItem: testProduct = {
		imageUrl:
			'https://firebasestorage.googleapis.com/v0/b/sneakers-shop-nln.appspot.com/o/lite-racer-2.0.jpg?alt=media&token=c2c0b8f1-6f62-4ce9-9baa-9f60c1feb0d5',
		title: 'GIÀY LITE RACER 2.0',
		price: 1400000,
	};

	let rows: Array<object> = [];
	if (amount === 9) {
		for (let i = 0; i < 3; i++) {
			// note: we add a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			rows.push(
				<Grid container xs={12} justify='center' className={classes.item}>
					<Grid item xs={4} container justify='flex-start'>
						<Product product={testProductItem} />
					</Grid>
					<Grid item xs={4} container justify='center'>
						<Product product={testProductItem} />
					</Grid>
					<Grid item xs={4} container justify='flex-end'>
						<Product product={testProductItem} />
					</Grid>
				</Grid>
			);
		}
	} else {
		for (let i = 0; i < amount; i++) {
			// note: we add a key prop here to allow react to uniquely identify each
			// element in this array. see: https://reactjs.org/docs/lists-and-keys.html
			rows.push(
				<Grid item>
					<Product product={testProductItem} />
				</Grid>
			);
		}
	}

	return (
		<div>
			<Grid
				className={classes.rowItem}
				container
				xs={12}
				justify='center'
				direction='row'
				spacing={amount === 9 ? 1 : 4}
			>
				{rows}
			</Grid>
		</div>
	);
};

export default Row;
