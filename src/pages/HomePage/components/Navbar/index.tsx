import React from 'react';
import Grid from '@material-ui/core/Grid';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	Navbar: {
		backgroundColor: '#262626',
	},
	box: {
		'&:hover': {
			backgroundColor: '#000000',
		},
	},
	Typography: {
		display: 'flex',
		justifyContent: 'center',
		color: 'white',
		padding: '10px',
		width: '9vw',
		borderRight: '2px solid white',
		transition: 'all 0.5ms ease-in-out',
		'&:hover': {
			color: 'yellow',
			pointer: 'cursor',
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
			
		</Grid>
	);
};

export default Navbar;
