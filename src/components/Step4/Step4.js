import React from 'react';
import { useHistory } from 'react-router-dom';
import { useData } from '../../context';
import Dropzone from 'react-dropzone';
import { Controller, useForm } from 'react-hook-form';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
} from '@material-ui/core';
import AttachFileOutlinedIcon from '@material-ui/icons/AttachFileOutlined';
import ButtonSubmit from '../../ui/Button';
import ComeBackButton from '../../ui/ComeBackButton';
import Header from '../../Layouts/Header';
import { InsertDriveFile } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

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
	paper: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		height: '128px',
	},
}));

const Step4 = () => {
	const { data, addData } = useData();
	const { control, handleSubmit } = useForm({
		defaultValues: {
			files: data.files,
		},
	});

	const history = useHistory();
	const classes = useStyles();

	const onSubmit = (data) => {
		history.push('/step5');
		addData(data);
	};

	return (
		<Header>
			<h1>Шаг 4</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					name="files"
					defaultValue={[]}
					control={control}
					rules={{ required: true }}
					render={({ onChange, onBlur, value }) => {
						return (
							<>
								<Dropzone onDrop={onChange}>
									{({ getRootProps, getInputProps }) => (
										<div className={classes.root}>
											<Paper>
												<div {...getRootProps()}>
													<input
														{...getInputProps()}
														onBlur={onBlur}
														name="files"
													/>
													<div className={classes.paper}>
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
									<h3>Выберите файлы или перетащите их мышкой</h3>
								</div>
								{value.length ? <h2>Выбранные Вами файлы:</h2> : null}
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
				<ButtonSubmit type="submit">Далее</ButtonSubmit>
			</form>
			<ComeBackButton path="/step3" />
		</Header>
	);
};

export default Step4;
