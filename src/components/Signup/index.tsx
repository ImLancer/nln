import React, { useState } from 'react';
import * as yup from 'yup';
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
import { auth } from 'firebase.js';

interface Props {}

const useStyles = makeStyles({
	mainBox: {
		backgroundImage: `url(${Background})`,
		backgroundSize: 'cover',
		backgroundPosition: 'center center',
		minHeight: '100vh',
	},
	loginBox: {
		minHeight: '400px',
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

interface signupAccEntry {
	accountMail: string;
	accountPassword: string;
	accountConfirmPassword: string;
}

const Signup: React.FC<Props> = () => {
	//khai báo all useState cho component
	const [showPassword, setShowPassword] = useState<boolean | undefined>(false);

	//khai báo chuyển trang trong react-router-dom
	const history = useHistory();

	//khai báo css
	const classes = useStyles();

	//phần khai báo cho yup làm validation
	const signupSchema = yup.object().shape({
		accountMail: yup.string().email().required(),
		accountPassword: yup.string().min(6, 'Mật khẩu có ít nhất 6 ký tự').required(),
		accountConfirmPassword: yup
			.string()
			.oneOf([yup.ref('accountPassword')], 'Mật khẩu không trùng nhau')
			.required(),
	});

	//phần khai báo cho react-hook-dom
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<signupAccEntry>({
		defaultValues: {
			accountMail: '',
			accountPassword: '',
			accountConfirmPassword: '',
		},
		resolver: yupResolver(signupSchema),
	});

	//hiển thị mật khẩu
	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	};

	//fucntion submit của form
	const onSubmit = async (data: signupAccEntry) => {
		const { accountMail, accountPassword } = data;
		await auth
			.createUserWithEmailAndPassword(accountMail, accountPassword)
			.then((authUser) => {
				console.log(authUser);
				history.push('/login');
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
								Đăng ký
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
										placeholder='abcdef@gmail.com'
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
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										className={classes.loginBoxItem}
										fullWidth
										type={showPassword ? 'text' : 'password'}
										color='primary'
										label='Nhập lại mật khẩu'
										id='accountConfirmPassword'
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
										error={errors?.accountConfirmPassword}
										helperText={errors.accountConfirmPassword?.message}
									/>
								)}
								name='accountConfirmPassword'
								control={control}
							/>
							<Button
								className={classes.loginBoxItem}
								fullWidth
								variant='contained'
								color='primary'
								onClick={handleSubmit(onSubmit)}
							>
								Đăng Ký
							</Button>
							<Grid
								container
								className={classes.loginBoxItem}
								xs={12}
								justify='flex-end'
								alignItems='center'
							>
								<Typography style={{ color: 'black' }}>
									Bạn đã có tài khoản ? <Link to='/login'> Đăng nhập</Link>
								</Typography>
							</Grid>
						</ThemeProvider>
					</form>
				</div>
			</Grid>
		</div>
	);
};

export default Signup;
