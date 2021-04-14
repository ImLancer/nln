import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import Product from 'pages/HomePage/components/Product';

const useStyles = makeStyles({
	rowItem: {
		minHeight: '270px',
	},
});

interface Props {}

const Row: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<div>
			<Grid item container xs={12} justify='center' alignItems='center'>
				<Grid
					className={classes.rowItem}
					item
					container
					xs={3}
					justify='center'
					alignItems='center'
				>
					<Product />
				</Grid>
			</Grid>
		</div>
	);
};

export default Row;
