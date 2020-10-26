import React, { Fragment } from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		width: '100%',
		margin: '0 auto',
		backgroundColor: '#1976d2',
		display: 'flex',
		justifyContent: 'center',
		paddingBottom: 10,
		paddingTop: 10,
		color: 'white',
	},
});

const Header = ({ children }) => {
	const styles = useStyles();
	return (
		<Fragment>
			<header>
				<Typography variant="h3" gutterBottom className={styles.root}>
					Анкета
				</Typography>
			</header>
			<main style={{ width: '50%', margin: '0 auto' }}>{children}</main>
		</Fragment>
	);
};

export default Header;
