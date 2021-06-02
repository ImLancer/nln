import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'pages/MainPage/components/Row';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import { selectNike } from 'features/productList/productListSlice';

//import interface
import productEntry from 'interfaces/product/productEntry';

interface Props {}

const useStyles = makeStyles({
	boxReverseUnit: {
		marginTop: '10px',
	},
	imageTitle: {
		padding: '10px',
		height: '1062px',
	},
	boxRow: { paddingBottom: '10px' },
});

const ReverseUnitProduct: React.FC<Props> = () => {
	const product: productEntry[] = useSelector(selectNike);

	const classes = useStyles();

	return (
		<Grid container xs={12} justify='center' className={classes.boxReverseUnit}>
			<Grid item container xs={10} direction='row'>
				<Grid item xs={6} className={classes.boxRow}>
					<Row amount={9} listProduct={product ? product : []} />
				</Grid>
				<Grid className={classes.imageTitle} item xs={6}>
					<img
						src='https://i.pinimg.com/originals/10/0a/45/100a45ce4edba95c6b722fc237dcb4bd.jpg'
						style={{ width: '100%', height: '100%' }}
						alt=''
					/>
				</Grid>
			</Grid>
			<Grid xs={10}></Grid>
		</Grid>
	);
};

export default ReverseUnitProduct;
