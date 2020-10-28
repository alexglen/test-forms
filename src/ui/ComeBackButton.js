import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'flex-end',
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
	},
}));

const ComeBackButton = ({ path }) => {
	const history = useHistory();
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Button
				variant="contained"
				color="secondary"
				onClick={() => history.push(path)}
			>
				Вернуться назад
			</Button>
		</div>
	);
};

export default ComeBackButton;
