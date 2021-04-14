import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {},
	banner: {
		width: '100%',
		minHeight: '400px',
	},
});

interface Props {}

const Banner: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid container xs={12} justify='center'>
			<Grid item className={classes.root} xs={10}>
				<img
					className={classes.banner}
					src='https://lotgiaythethao.com/wp-content/uploads/2018/01/Sale-Banner-Sneakers.jpg'
				/>
			</Grid>
		</Grid>
	);
};

export default Banner;
