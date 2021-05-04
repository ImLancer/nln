import React, { useState } from 'react';
import * as yup from 'yup';
import { auth } from 'firebase.js';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Background from './images/login-pic-1.jpg';
import Grid from '@material-ui/core/Grid';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@material-ui/core/TextField';
import { yupResolver } from '@hookform/resolvers/yup';
import accountEntry from 'interfaces/account/accountEntry';
import { FormHelperText, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { purple, grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

interface Props {}

const useStyles = makeStyles({
	mainBox: {
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '100vh',
	},
	loginBox: {
		minHeight: '330px',
		minWidth: '400px',
		paddingRight: '1.5vw',
		paddingLeft: '1.5vw',
		backgroundColor: 'rgba(240, 248, 255,0.90)',
		color: 'white',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		borderRadius: '8px',
	},
	loginBoxItem: {
		marginTop: '18px',
	},
	loginLink: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
});

const theme = createMuiTheme({
	typography: {
		fontFamily: 'Times New Roman',
	},
	palette: {
		primary: {
			main: purple[500],
		},
	},
	overrides: {
		MuiInputLabel: {
			root: {
				fontSize: '1.3rem',
				fontWeight: 'bold',
			},
		},
	},
	props: {
		MuiTextField: {
			InputLabelProps: {
				shrink: true,
			},
		},
	},
});

const Login: React.FC<Props> = () => {
	//tất cả các khai báo useState sử dụng trong hàm
	const [showPassword, setShowPassword] = useState<boolean | undefined>(false);

	//chuyển trang trong react-router-dom
	const history = useHistory();

	//khai báo ccs
	const classes = useStyles();

	//định nghĩa cho yup để validation
	const loginSchema = yup.object().shape({
		accountMail: yup.string().email().required(),
		accountPassword: yup.string().required(),
	});

	//khai báo cho phần react-hook-form
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<accountEntry>({
		defaultValues: {
			accountMail: '',
			accountPassword: '',
		},
		resolver: yupResolver(loginSchema),
	});

	//Thao tác đóng tắt menu
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	//Function submit của form
	const onSubmit = async (data: accountEntry) => {
		const { accountMail, accountPassword } = data;
		await auth
			.signInWithEmailAndPassword(accountMail, accountPassword)
			.then((authUser) => {
				history.push('/');
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div>
			<Grid container className={classes.mainBox} alignItems='center' justify='center' xs={12}>
				<div>
					<form className={classes.loginBox} onSubmit={handleSubmit(onSubmit)}>
						<ThemeProvider theme={theme}>
							<Typography variant='h4' className={classes.loginBoxItem} color='primary'>
								Đăng nhập
							</Typography>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										color='primary'
										label='Tên đăng nhập'
										id='accountMail'
										size='small'
										error={errors?.accountMail}
										helperText={errors.accountMail?.message}
									/>
								)}
								name='accountMail'
								control={control}
							/>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										type={showPassword ? 'text' : 'password'}
										color='primary'
										label='Mật khẩu'
										id='accountPassword'
										size='small'
										InputProps={{
											endAdornment: (
												<InputAdornment position='end'>
													<IconButton
														aria-label='toggle password visibility'
														onClick={handleClickShowPassword}
														onMouseDown={handleMouseDownPassword}
													>
														{showPassword ? <Visibility /> : <VisibilityOff />}
													</IconButton>
												</InputAdornment>
											),
										}}
										error={errors?.accountPassword}
										helperText={errors.accountPassword?.message}
									/>
								)}
								name='accountPassword'
								control={control}
							/>
							<Button
								className={classes.loginBoxItem}
								fullWidth
								variant='contained'
								color='primary'
								type='submit'
								onClick={handleSubmit(onSubmit)}
							>
								Đăng Nhập
							</Button>
							<Grid
								container
								className={classes.loginBoxItem}
								xs={12}
								justify='flex-end'
								alignItems='center'
							>
								<Typography style={{ color: 'black' }}>
									Bạn chưa có tài khoản ? <Link to='/signup'> Đăng ký</Link>{' '}
									<Link to='/'>Trang chủ</Link>
								</Typography>
							</Grid>
						</ThemeProvider>
					</form>
				</div>
			</Grid>
		</div>
	);
};

export default Login;
