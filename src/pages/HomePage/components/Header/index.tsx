import React, { ReactElement } from 'react';
import { auth } from 'firebase.js';
import Grid from '@material-ui/core/Grid';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from 'features/user/userSlice';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { InputBase, Typography } from '@material-ui/core';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
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
	//all state cho component
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const dispatch = useDispatch();

	//all selector cho component
	const user = useSelector(selectUser);

	//khai báo css
	const classes = useStyles();

	const isMenuOpen = Boolean(anchorEl);

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const handleMenuCloseLogout = () => {
		setAnchorEl(null);
		auth.signOut();
		dispatch(logout());
	};

	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<Link to='/login' style={{ textDecoration: 'none', color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Đăng nhập</MenuItem>
			</Link>
			<Link to='/signup' style={{ textDecoration: 'none', color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Đăng ký</MenuItem>
			</Link>
			<Link to='/management' style={{ textDecoration: 'none', color: 'black' }}>
				<MenuItem onClick={handleMenuClose}>Quản lí</MenuItem>
			</Link>
		</Menu>
	);

	const renderMenuUser = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		>
			<MenuItem onClick={handleMenuClose}>Chào mưng {user}</MenuItem>
			<MenuItem onClick={handleMenuCloseLogout}>Log out</MenuItem>
		</Menu>
	);

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
					<Grid item container justify='center' direction='row'>
						<IconButton>
							<Badge badgeContent={1} color='error'>
								<ShoppingCartIcon className={classes.CartIcon} />
							</Badge>
						</IconButton>
						<IconButton
							edge='end'
							aria-label='account of current user'
							aria-haspopup='true'
							onClick={handleProfileMenuOpen}
							color='inherit'
						>
							<AccountCircleIcon className={classes.AccountIcon} />
						</IconButton>
					</Grid>
					{user === '' || user === null ? renderMenu : renderMenuUser}
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Header;
