import { Button } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/Header';

const Results = () => {
	const history = useHistory();
	return (
		<Header>
			<h1>results</h1>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step5')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Results;
