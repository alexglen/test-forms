import { TextField } from '@material-ui/core';
import React, { forwardRef } from 'react';

const Input = forwardRef((props, ref) => {
	return (
		<div>
			<TextField
				{...props}
				variant="outlined"
				fullWidth
				margin="normal"
				inputRef={ref}
			></TextField>
		</div>
	);
});

export default Input;
