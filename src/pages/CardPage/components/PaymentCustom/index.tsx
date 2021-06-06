//import react necessary
import React, { useState } from 'react';

//import cho redux
import { useDispatch, useSelector } from 'react-redux';
import {
	selectTotalCard,
	selectPaymentCard,
	cardCustom,
} from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

//import giao dien material-ui
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, useTheme } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

//import colors
import yellow from '@material-ui/core/colors/yellow';

//import icon
import { GiPayMoney } from 'react-icons/gi';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {},
		box: {
			height: '40px',
			padding: '5px',
		},
		button: {
			color: yellow[300],
			backgroundColor: '#383838',
			'&:hover': { color: yellow[600], backgroundColor: '#000000' },
		},
	})
);

interface Props {
	products: productEntry[];
}

const CardPage: React.FC<Props> = ({ products }) => {
	//khai bao danh cho redux
	const dispatch = useDispatch();

	const sub: cardCustom[] = useSelector(selectPaymentCard);

	let paymentCard: cardCustom[] = [...sub];

	const classes = useStyles();

	let total = 0;

	if (paymentCard.length !== 0) {
		paymentCard.map((prod) => {
			let price: number | undefined = products.find((item) => item.prodId === prod.id).prodPrice;
			if (price !== undefined) {
				total += prod.amount * price;
			}
		});
	}

	//khai bao format currency
	const formatter = new Intl.NumberFormat('de-DE', {
		style: 'currency',
		currency: 'VND',
		minimumFractionDigits: 0,
	});

	return (
		<Grid xs={12}>
			<Grid xs={12} className={classes.box}>
				<Typography>Trong giỏ đồ của bạn đang có ({products.length}) sản phẩm.</Typography>
			</Grid>
			<Grid xs={12} className={classes.box}>
				<Typography>Tổng số tiền bản phải trả là: {formatter.format(total)}</Typography>
			</Grid>
			<Grid item xs={12} className={classes.box}>
				<Button
					variant='contained'
					color='secondary'
					className={classes.button}
					startIcon={<GiPayMoney />}
				>
					Thanh Toán
				</Button>
			</Grid>
		</Grid>
	);
};

export default CardPage;
