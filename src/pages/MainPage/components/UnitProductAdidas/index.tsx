import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'pages/MainPage/components/Row';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import { selectAdidas } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const useStyles = makeStyles({
	boxUnit: {
		marginTop: '5px',
	},
	imageTitle: {
		padding: '10px 15px 10px 0',
		maxHeight: '1062px',
	},
	boxRow: {
		paddingBottom: '10px',
	},
});

const UnitProduct: React.FC<Props> = () => {
	const product: productEntry[] = useSelector(selectAdidas);

	const classes = useStyles();

	return (
		<Grid container xs={12} justify='center' className={classes.boxUnit}>
			<Grid item container xs={10} direction='row'>
				<Grid className={classes.imageTitle} item xs={6}>
					<img
						src='https://i.pinimg.com/originals/58/51/be/5851be54a7c02d9550593aba2fb3473a.jpg'
						style={{ width: '100%', height: '100%' }}
						alt=''
					/>
				</Grid>
				<Grid item xs={6} className={classes.boxRow}>
					<Row amount={9} listProduct={product ? product : []} />
				</Grid>
			</Grid>
			<Grid xs={10}></Grid>
		</Grid>
	);
};

export default UnitProduct;
