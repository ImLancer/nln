import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Row from 'pages/HomePage/components/Row';

interface Props {}

const useStyles = makeStyles({
	boxReverseUnit: {
		marginTop: '10px',
	},
	imageTitle: {
		padding: '10px',
		height: '100%',
	},
	boxRow: { paddingBottom: '10px' },
});

const ReverseUnitProduct: React.FC<Props> = () => {
	const classes = useStyles();

	return (
		<Grid container xs={12} justify='center' className={classes.boxReverseUnit}>
			<Grid item container xs={10} direction='row'>
				<Grid item xs={6} className={classes.boxRow}>
					<Row amount={9} />
				</Grid>
				<Grid className={classes.imageTitle} item xs={6}>
					<img
						src='https://deestore.vn/wp-content/uploads/2019/07/eNcyVVC-1280x800.jpg'
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
