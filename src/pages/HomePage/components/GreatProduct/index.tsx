import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import Row from 'pages/HomePage/components/Row';

interface Props {}

const GreatProduct: React.FC<Props> = () => {
	return (
		<Grid container xs={12} justify='center'>
			<Grid item xs={10}>
				<Row amount={6}/>
			</Grid>
		</Grid>
	);
};

export default GreatProduct;
