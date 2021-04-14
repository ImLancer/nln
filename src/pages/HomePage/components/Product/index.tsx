import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';

const useStyles = makeStyles({
	product: {
		width: '100%',
		minHeight: '65%',
	},
	image: {
		width: '170px',
		height: '170px',
	},
	boxProductItem: {
		height: '35%',
	},
	productItem: {
		height: '32%',
	},
});

interface Props {}

const Product: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Paper className={classes.product} square>
			<Grid>
				<img className={classes.image} src='#' />
			</Grid>
			<Grid className={classes.boxProductItem} container justify='center' alignItems='center'>
				<Grid
					className={classes.productItem}
					item
					xs={12}
					container
					justify='center'
					alignItems='center'
				>
					<Typography>Title</Typography>
				</Grid>
				<Grid
					className={classes.productItem}
					item
					xs={12}
					container
					justify='center'
					alignItems='center'
				>
					<Typography>MSP</Typography>
				</Grid>
				<Grid
					className={classes.productItem}
					item
					xs={12}
					container
					justify='center'
					alignItems='center'
				>
					<Typography>Price</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Product;
