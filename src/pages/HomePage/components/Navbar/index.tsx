import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	Navbar: {
		backgroundColor: 'black',
	},
	Typography: {
		display: 'flex',
		justifyContent: 'center',
		color: 'white',
		padding: '10px',
		width: '9vw',
		opacity: '0.8',
		borderRight: '2px solid white',
		'&:hover': {
			opacity: '1',
		},
		'&.active': {
			opacity: '1',
		},
	},
	TypographyLast: {
		borderRight: 'none',
	},
	TypographyActive: {
		opacity: '1',
	},
});

interface Props {}

const Navbar: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.Navbar} xs={12} justify='center' alignItems='center'>
			<Grid item container xs={9} justify='center' alignItems='center'>
				<Grid item>
					<Typography className={clsx(classes.Typography, classes.TypographyActive)}>
						Trang Chu
					</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.Typography}>Giay Adidas</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.Typography}>Giay Nike</Typography>
				</Grid>
				<Grid item>
					<Typography className={classes.Typography}>Giay Vans</Typography>
				</Grid>
				<Grid item>
					<Typography className={clsx(classes.Typography, classes.TypographyLast)}>
						Giay Thoi Trang
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Navbar;
