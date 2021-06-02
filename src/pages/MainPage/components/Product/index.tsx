import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Paper } from '@material-ui/core';
// import { testProduct } from '../Row/index';
// import { selectProduct } from 'features/productList/productListSlice';
// import { useDispatch, useSelector } from 'react-redux';
import productEntry from 'interfaces/product/productEntry';

const useStyles = makeStyles({
	product: {
		width: '190px',
		height: '340px',
	},
	image: {
		width: '190px',
		height: '190px',
	},
	productItem: { marginTop: '20px' },
});

interface Props {
	product: productEntry;
}

const formatter = new Intl.NumberFormat('de-DE', {
	style: 'currency',
	currency: 'VND',
	minimumFractionDigits: 0,
});

const Product: React.FC<Props> = ({ product }) => {
	const classes = useStyles();

	console.log(product);

	return (
		<Paper className={classes.product} square>
			<Grid>
				<img className={classes.image} src={product ? product.prodUrlList[0] : '#'} alt='' />
			</Grid>
			<Grid style={{ padding: '8px 13px 0px 13px' }}>
				<Grid item xs={12} style={{ height: '55px' }}>
					<Typography style={{ fontWeight: 'bold', fontSize: '16px' }}>
						{product ? product.prodName : ''}
					</Typography>
				</Grid>
				<Grid className={classes.productItem} item xs={12}>
					<Typography style={{ fontWeight: 'bold' }}>
						{product ? formatter.format(product.prodPrice) : ''}
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default Product;
