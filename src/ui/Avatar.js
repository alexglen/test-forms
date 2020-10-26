import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		width: theme.spacing(7),
		height: theme.spacing(7),
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

const AvatarApp = () => {
	const styles = useStyles();
	return <Avatar src="/broken-image.jpg" className={styles.root} />;
};

export default AvatarApp;
