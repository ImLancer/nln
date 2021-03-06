import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		minHeight: '60px',
		display: 'flex',
		alignItems: 'center',
		backgroundColor: '#0D324D',
	},
	boxAvatar: {
		minHeight: '60px',
		display: 'flex',
		alignItems: 'center',
	},
	avatar: {
		height: '40px',
		width: '40px',
		transform: 'translateX(10px)',
		cursor: 'pointer',
	},
	logout: {
		minHeight: '60px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: '#f5f5f5',
		borderLeft: '2px solid #67697C',
		'&:hover': {
			backgroundColor: '#253D5B',
			cursor: 'pointer',
			borderLeft: '4px solid #67697C',
		},
	},
});

interface Props {}

const Header: React.FC<Props> = () => {
	const classes = useStyles();
	return (
		<Grid container className={classes.root} xs={12} justify='space-between'>
			<Grid className={classes.boxAvatar} xs={8}>
				<Avatar
					className={classes.avatar}
					alt='name'
					src='data:image/jpeg;base64,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'
				/>
			</Grid>

			<Grid className={classes.logout} xs={3}>
				Thoa??t ra
			</Grid>
		</Grid>
	);
};

export default Header;
