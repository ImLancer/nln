import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import logo from './images/logo2.png';

const useStyles = makeStyles({
	root: {
		maxHeight: '30vh',
		backgroundColor: 'lightgrey',
	},
	logo: {
		cursor: 'pointer',
	},
	SearchBox: {
		border: '1px solid #404040',
		borderRadius: '6vh',
	},
	InputBase: {
		padding: '5px',
		width: '75%',
		outline: 'none',
	},
	SearchIcon: {
		fontSize: '2.5vw',
		cursor: 'pointer',
		padding: '3px',
	},
	CartIcon: {
		fontSize: '2.2vw',
		cursor: 'pointer',
		transition: 'tranform 0.2s each-in-out',
		'&:hover': {
			transform: 'scale(1.03)',
		},
	},
	AccountIcon: {
		fontSize: '2.2vw',
		cursor: 'pointer',
		transition: 'tranform 0.2s each-in-out',
		'&:hover': {
			transform: 'scale(1.03)',
		},
	},
	Typography: {
		padding: '2px',
		borderLeft: '1px solid black',
		cursor: 'pointer',
	},
});

interface Props {}

const Header: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid className={classes.root} container justify='center' alignItems='center'>
			<Grid item container xs={10}>
				<Grid item xs={2}>
					<img className={classes.logo} height={60} width={60} src={logo} />
				</Grid>
				<Grid item container xs={8} justify='center' alignItems='center'>
					<Grid
						className={classes.SearchBox}
						item
						container
						xs={8}
						justify='center'
						alignItems='center'
					>
						<SearchIcon className={classes.SearchIcon} />
						<InputBase className={classes.InputBase} placeholder='Adidas, Nike,...' />
						<Typography className={classes.Typography} variant='h6'>
							Search
						</Typography>
					</Grid>
				</Grid>
				<Grid item container xs={2} justify='flex-end' alignItems='center'>
					<Grid item container justify='center'>
						<Grid item xs={3}>
							<Badge badgeContent={4} color='error'>
								<ShoppingCartIcon className={classes.CartIcon} />
							</Badge>
						</Grid>
						<Grid item xs={3}>
							<AccountCircleIcon className={classes.AccountIcon} />
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Header;
