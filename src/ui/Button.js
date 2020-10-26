import React from 'react';
import Button from '@material-ui/core/Button';

const ButtonSubmit = ({ children, ...props }) => {
	return (
		<Button variant="contained" color="primary" fullWidth {...props}>
			{children}
		</Button>
	);
};

export default ButtonSubmit;
