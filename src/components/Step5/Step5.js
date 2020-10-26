import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/Header';

const Step5 = () => {
	const history = useHistory();
	return (
		<Header>
			<h1>step5</h1>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step4')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Step5;
