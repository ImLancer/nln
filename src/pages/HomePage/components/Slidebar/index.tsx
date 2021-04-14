import React, { ReactElement } from 'react';
import Grid from '@material-ui/core/Grid';
import { slideitem } from './Styles.js';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		paddingTop: '10px',
	},
	Paper: (props) => ({
		...props,
	}),
	Paper1: (props) => ({
		...props,
		backgroundImage:
			'url(https://file.hstatic.net/1000282067/file/theo-chan-hot-tiktoker-viet-nam-custom-giay-nike-af1-cuc-thu-hut-1_5be0c64cb6a64011932886f5470043f9_grande.jpg)',
	}),
	Paper2: (props) => ({
		...props,
		backgroundImage:
			'url(https://img.cungcap.net/media/2018/04/07/1523084683-hsk5c1523084683-giay-vans-marvel-2-thoi-trang.jpeg)',
	}),
});

interface Props {}

const Slidebar: React.FC<Props> = () => {
	const classes = useStyles(slideitem);
	return (
		<Grid container xs={12} justify='center'>
			<Grid item container className={classes.root} xs={10} justify='center'>
				<Grid item xs={4}>
					<Paper className={classes.Paper} square>
						<Typography variant='h6' component='p'>
							Mua Ngay
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.Paper1} square>
						<Typography variant='h6' component='p'>
							Mua Ngay
						</Typography>
					</Paper>
				</Grid>
				<Grid item xs={4}>
					<Paper className={classes.Paper2} square>
						<Typography variant='h6' component='p'>
							Mua Ngay
						</Typography>
					</Paper>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default Slidebar;
