/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import * as yup from 'yup';
import Grid from '@material-ui/core/Grid';
import { FormHelperText, InputAdornment, OutlinedInput, Typography } from '@material-ui/core';
import { Controller, useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import { sizes, brands } from './constants.js';
import { yupResolver } from '@hookform/resolvers/yup';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import QueueIcon from '@material-ui/icons/Queue';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import productEntry from 'interfaces/product/productEntry';
import { app } from 'firebase.js';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles({
	root: {},
	box: {},
	boxContainer: {},
	boxForm: {
		margin: '20px',
	},
	boxTextField: {},
	boxButton: {
		justifyContent: 'flex-end',
	},
	boxCheckboxSize: {},
	formTitle: {
		display: 'flex',
		alignItems: 'center',
		margin: '5px',
		minHeight: '30px',
	},
	itemTitle: {
		display: 'flex',
		alignItems: 'center',
	},
});

const AddProductSchema = yup.object().shape({
	prodName: yup.string().required().min(3).max(100),
	prodBrand: yup.string(),
	prodPrice: yup.number().required().min(50000),
	prodDescription: yup.string(),
	prodDate: yup.date().default(function () {
		return new Date();
	}),
});

interface Props {}

const AddProduct: React.FC<Props> = () => {
	//all useState sử dụng cho component
	const [urlList, setUrlList] = useState([]); //chửa danh sách url từ người dùng nhập vào

	//khai báo css
	const classes = useStyles();

	//khai báo cho react-hook-dom
	const {
		register,
		handleSubmit,
		formState: { errors },
		control,
		reset,
	} = useForm<productEntry>({
		defaultValues: {
			prodName: '',
			prodSize: [],
			prodDescription: '',
			prodBrand: '',
		},
		resolver: yupResolver(AddProductSchema),
	});

	//kết nối cơ sở dữ liệu
	const ref = app.firestore().collection('products');

	//function thêm sản phầm lên cơ sở dữ liệu
	function addProduct(
		prodName: string,
		prodBrand: string,
		prodSize: string[],
		prodPrice: number,
		prodDescription: string,
		prodUrlList: string[],
		prodDate: Date
	) {
		ref
			.doc()
			.set({
				prodName: prodName,
				prodBrand: prodBrand,
				prodSize: prodSize,
				prodPrice: prodPrice,
				prodDescription: prodDescription,
				prodUrlList: prodUrlList,
				prodDate: prodDate,
			})
			.catch((err) => {
				console.log(err);
			});
	}

	//submit xử lí của form
	const onSubmit = async (data: productEntry) => {
		const {
			prodName,
			prodBrand,
			prodSize,
			prodPrice,
			prodDescription,
			prodImageUrl,
			prodDate,
		} = data;

		const storageRef = await app.storage().ref();

		for (let i = 0; i < prodImageUrl.length; i++) {
			let fileRef = await storageRef.child(prodImageUrl[i].name);
			await fileRef.put(prodImageUrl[i]);
			await fileRef.getDownloadURL().then((url) => {
				setUrlList(urlList.push(url));
			});
		}

		await addProduct(prodName, prodBrand, prodSize, prodPrice, prodDescription, urlList, prodDate);
		await setUrlList([]);
		await reset();
	};

	return (
		<Grid className={classes.root} xs={12}>
			<Grid container xs={12} justify='center'>
				<Typography className={classes.formTitle} variant='h5' component='p'>
					Thêm sản phẩm mới
				</Typography>
			</Grid>
			<Container maxWidth='md' className={classes.boxContainer}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Tên sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										id='prodName'
										label='Bắt buộc'
										variant='outlined'
										size='small'
										color='primary'
										placeholder='adidas Superstar White Core Black,...'
										error={errors?.prodName}
										helperText={errors.prodName?.message}
									/>
								)}
								name='prodName'
								control={control}
							/>
						</Grid>
					</Grid>

					{/* <Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Màu sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										fullWidth
										label='Khuyến khích'
										variant='outlined'
										size='small'
										color='primary'
										placeholder='Green,grey,black,...'
										error={errors?.prodColor}
										helperText={errors.prodColor?.message}
									/>
								)}
								name='prodColor'
								control={control}
							/>
						</Grid>
					</Grid> */}

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Kích cỡ sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='prodsize-label'>Bắt buộc</InputLabel>
										<Select
											{...field}
											labelId='prodsize-label'
											label='Bắt buộc'
											id='prodSize'
											color='primary'
											multiple
										>
											{sizes.map((size) => (
												<MenuItem value={size.value}>{size.title}</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
								name='prodSize'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Mô tả sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<TextField
										{...field}
										id='prodDescription'
										label='Khuyến khích'
										size='small'
										color='primary'
										multiline
										rows={4}
										fullWidth
										placeholder='Mô tả sơ lược về sản phẩm.'
										variant='outlined'
										error={errors?.prodDescription}
										helperText={errors.prodDescription?.message}
									/>
								)}
								name='prodDescription'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Thương hiệu sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl fullWidth variant='outlined'>
										<InputLabel id='demo-simple-select-outlined-label'>Bắt buộc</InputLabel>
										<Select
											{...field}
											labelId='prodBrand'
											id='prodBrand'
											label='Bắt buộc'
											color='primary'
										>
											<MenuItem value=''>
												<em>None</em>
											</MenuItem>
											{brands.map((brand) => (
												<MenuItem value={brand.value}>{brand.title}</MenuItem>
											))}
										</Select>
									</FormControl>
								)}
								name='prodBrand'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Giá sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<Controller
								render={({ field }) => (
									<FormControl variant='outlined'>
										<InputLabel htmlFor='prodPrice'>Bắt buộc</InputLabel>
										<OutlinedInput
											{...field}
											id='prodPrice'
											placeholder='0'
											color='primary'
											startAdornment={<InputAdornment position='start'>$</InputAdornment>}
											labelWidth={65}
											error={errors?.prodPrice}
										/>
										<FormHelperText id='prodPrice'>{errors.prodPrice?.message}</FormHelperText>
									</FormControl>
								)}
								name='prodPrice'
								control={control}
							/>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Grid className={classes.itemTitle} xs={4}>
							<Typography variant='h6'>Hình ảnh sản phẩm:</Typography>
						</Grid>
						<Grid xs={8}>
							<input
								{...register('prodImageUrl')}
								id='prodImageUrl'
								multiple
								type='file'
								style={{ display: 'none' }}
							/>
							<label htmlFor='prodImageUrl'>
								<Button variant='contained' component='span' startIcon={<AddPhotoAlternateIcon />}>
									Upload
								</Button>
							</label>
						</Grid>
					</Grid>

					<Grid container className={classes.boxForm} xs={12} justify='flex-end'>
						<Button
							type='submit'
							variant='contained'
							color='primary'
							size='small'
							startIcon={<QueueIcon />}
						>
							Thêm sản phẩm
						</Button>
					</Grid>
				</form>
			</Container>
		</Grid>
	);
};

export default AddProduct;
