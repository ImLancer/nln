//import from local
import logo from './images/logo5.png';
import { style } from './style.js';

//import necessary for react
import React, { useState } from 'react';
import clsx from 'clsx';
import * as yup from 'yup';
import { Link } from 'react-router-dom';

//import for firebase
import { auth } from 'firebase.js';

//import for form
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';

//import for redux
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from 'features/user/userSlice';

//import for material-core
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, InputAdornment } from '@material-ui/core';

//import icon
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import { GiReturnArrow } from 'react-icons/gi';

const useStyles = makeStyles({
	...style,
});

interface Props {}

interface search {
	searchValue: string;
}

const Header: React.FC<Props> = () => {
	//all state cho component
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [showSearch, setShowSearch] = useState<boolean | undefined>(false);

	//khai bao cho redux
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

	//schema cho search
	const searchSchema = yup.object().shape({
		searchValue: yup.string().min(3, 'Nhập ít nhất 3 ký tự.').required(),
	});

	//khai bao cho form
	const {
		handleSubmit,
		formState: { errors },
		control,
	} = useForm<search>({
		defaultValues: {
			searchValue: '',
		},
		resolver: yupResolver(searchSchema),
	});

	const searchBar = (
		<Grid item container xs={10}>
			<form style={{ width: '100%' }}>
				<Controller
					render={({ field }) => (
						<TextField
							{...field}
							className={classes.searchBox}
							fullWidth
							type='text'
							id='searchValue'
							size='small'
							variant='outlined'
							placeholder='Nhập tên giày bạn muốn tìm kiếm...'
							InputProps={{
								className: classes.input,
								endAdornment: (
									<InputAdornment position='end'>
										<IconButton
											onClick={() => {
												setShowSearch(false);
											}}
										>
											<GiReturnArrow style={{ color: 'white' }} />
										</IconButton>
									</InputAdornment>
								),
							}}
							error={errors?.searchValue}
							helperText={errors.searchValue?.message}
						/>
					)}
					name='searchValue'
					control={control}
				/>
			</form>
		</Grid>
	);

	return (
		<Grid className={classes.root} container justify='center' alignItems='center'>
			{showSearch ? (
				searchBar
			) : (
				<Grid item container xs={12}>
					<Grid item xs={2}>
						<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
							<img className={classes.logo} height={65} width={120} src={logo} alt='' />
						</Link>
					</Grid>
					<Grid
						item
						container
						className={classes.Navbar}
						xs={8}
						justify='center'
						alignItems='center'
					>
						<Grid item className={classes.box}>
							<Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
								<Typography className={classes.TypographyNav}>Trang chủ</Typography>
							</Link>
						</Grid>
						<Grid item className={classes.box}>
							<Link to='/productpage' style={{ textDecoration: 'none', color: 'black' }}>
								<Typography className={classes.TypographyNav}>Adidas</Typography>
							</Link>
						</Grid>
						<Grid item className={classes.box}>
							<Typography className={classes.TypographyNav}>Nike</Typography>
						</Grid>
						<Grid item className={classes.box}>
							<Typography className={classes.TypographyNav}>Yeezy</Typography>
						</Grid>
						<Grid item className={classes.box}>
							<Typography className={clsx(classes.TypographyNav, classes.TypographyLast)}>
								Jordan
							</Typography>
						</Grid>
					</Grid>
					{/* <Grid item container xs={8} justify='center' alignItems='center'>
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
							Tìm kiếm
						</Typography>
					</Grid>
				</Grid> */}
					<Grid item container xs={2} justify='flex-end' alignItems='center'>
						<Grid item container justify='flex-end' direction='row'>
							<IconButton
								onClick={() => {
									setShowSearch(true);
								}}
							>
								<SearchIcon className={classes.SearchIcon} />
							</IconButton>
							<IconButton>
								<Badge badgeContent={0} color='error'>
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
			)}
		</Grid>
	);
};

export default Header;
