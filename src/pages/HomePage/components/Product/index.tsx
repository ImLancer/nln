import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
import { testProduct } from './../Row/index';
import { prettyDOM } from '@testing-library/dom';

const useStyles = makeStyles({
	product: {
		width: '170px',
		height: '280px',
	},
	image: {
		width: '170px',
		height: '170px',
	},
	productItem: {
		padding: '5px',
	},
});

interface Props {
	product: testProduct;
}

const Product: React.FC<Props> = ({ product }) => {
	const classes = useStyles();
	return (
		<Paper className={classes.product} square>
			<Grid>
				<img className={classes.image} src={product.imageUrl} alt='' />
			</Grid>
			<Grid>
				<Grid className={classes.productItem} item xs={12}>
					<Typography>{product.title}</Typography>
				</Grid>
				<Grid className={classes.productItem} item xs={12}>
					<Typography>{product.price}</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Product;
