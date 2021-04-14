import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { product } from 'pages/HomePage/components/GreatProduct/Constants.js';
import Row from 'pages/HomePage/components/Row';

interface Props {}

const GreatProduct: React.FC<Props> = () => {
	return (
		<div>
			<Grid container xs={12} justify='center'>
				<Grid item container xs={10} justify='center'>
					<Row />
				</Grid>
			</Grid>
			{console.log(product)}
		</div>
	);
};

export default GreatProduct;
