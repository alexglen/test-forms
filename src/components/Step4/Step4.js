import {
	Button,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
} from '@material-ui/core';
import React, { Fragment } from 'react';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../Layouts/Header';
import { makeStyles } from '@material-ui/core/styles';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import { InsertDriveFile } from '@material-ui/icons';
import ButtonSubmit from '../../ui/Button';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'center',
		cursor: 'pointer',
		'& > *': {
			margin: theme.spacing(1),
			width: theme.spacing(16),
			height: theme.spacing(16),
		},
	},
}));

const Step4 = () => {
	const { control, handleSubmit } = useForm();
	const history = useHistory();
	const styles = useStyles();
	const onSubmit = (data) => {
		history.push('/step5');
	};

	return (
		<Header>
			<h1>step4</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="files"
					defaultValue={[]}
					control={control}
					rules={{ required: true }}
					render={({ onChange, onBlur, value }) => {
						console.log(value);
						return (
							<>
								<Dropzone onDrop={onChange}>
									{({ getRootProps, getInputProps }) => (
										<div className={styles.root}>
											<Paper>
												<div {...getRootProps()}>
													<input
														{...getInputProps()}
														onBlur={onBlur}
														name="files"
													/>
													<div
														style={{
															display: 'flex',
															justifyContent: 'center',
															alignItems: 'center',
															height: '128px',
														}}
													>
														<AttachFileOutlinedIcon
															color="primary"
															fontSize="large"
														/>
													</div>
												</div>
											</Paper>
										</div>
									)}
								</Dropzone>
								<div style={{ display: 'flex', justifyContent: 'center' }}>
									<h3>Choose files or click files</h3>
								</div>
								<h2>Your files:</h2>
								<List component="nav" aria-label="main mailbox folders">
									{value.map((file, index) => {
										return (
											<ListItem key={index}>
												<ListItemIcon>
													<InsertDriveFile />
												</ListItemIcon>
												<ListItemText
													primary={file.name}
													secondary={file.size}
												/>
											</ListItem>
										);
									})}
								</List>
							</>
						);
					}}
				/>
				<ButtonSubmit type="submit">Next step</ButtonSubmit>
			</form>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step3')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Step4;
