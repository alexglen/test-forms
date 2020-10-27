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
import { useData } from '../../context';

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
	const { data, addData } = useData();
	const { control, handleSubmit } = useForm({
		defaultValues: {
			files: data.files,
		},
	});
	const history = useHistory();
	const styles = useStyles();
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
									<h3>Выберите файлы или перетащите их мышкой</h3>
								</div>
								<h2>Выбранные Вами файлы:</h2>
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
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step3')}
				>
					Вернуться назад
				</Button>
			</div>
		</Header>
	);
};

export default Step4;
