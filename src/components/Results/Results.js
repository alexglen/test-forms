import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/Header';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useData } from '../../context';
import { convertArrayWithSkillsToStrings, createData } from '../../utils';
import { monthDeclination } from '../../data/selectOptions';
import { Alert, AlertTitle } from '@material-ui/lab';
import ButtonSubmit from '../../ui/Button';
import {
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	Modal,
} from '@material-ui/core';
import { getModalStyle } from '../../utils';
import { InsertDriveFile } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	paper: {
		position: 'absolute',
		width: 700,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	table: {
		width: '80%',
		margin: '0 auto',
	},
}));

const Results = () => {
	const history = useHistory();
	const classes = useStyles();
	const { data } = useData();
	const [openAlert, setOpenAlert] = useState(false);
	const [modalStyle] = useState(getModalStyle);

	const first =
		data?.['1'] && data?.['10']
			? `${data['1'].label}(${data['10'].label})`
			: '';
	const second =
		data?.['2'] && data?.['20']
			? `${data['2'].label}(${data['20'].label})`
			: '';
	const third =
		data?.['3'] && data?.['30']
			? `${data['2'].label}(${data['20'].label})`
			: '';

	const rows = [
		createData('Имя и фамилия', `${data.firstName} ${data.lastName}`),
		createData('Email', data.email),
		createData('Номер телефона', data.tel || 'не указано'),
		createData('Аккаунт GitHub', data.github || 'не указано'),
		createData(
			'Дата рождения',
			`${data.daySelect.label} ${monthDeclination[data.monthSelect.label]} ${
				data.yearSelect.label
			} `
		),
		createData('Регион проживания', data.region.label),
		createData('Населённый пункт', data.city.label),
		createData('Навыки', convertArrayWithSkillsToStrings(data.skills)),
		createData('Несколько слов о себе', data.info),
		createData('Родной язык', data.firstLanguage.label),
		createData(
			'Иностранные языки',
			`${first}
		${second}
		 ${third}`
		),
	];

	return (
		<Header>
			<h1>Результаты</h1>
			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left" style={{ fontWeight: 600 }}>
								Тема
							</TableCell>
							<TableCell align="right" style={{ fontWeight: 600 }}>
								Информация
							</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{rows.map((row) => (
							<TableRow key={row.name}>
								<TableCell
									component="th"
									scope="row"
									style={{ fontStyle: 'italic' }}
								>
									{row.name}
								</TableCell>
								<TableCell align="right">{row.value}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>

			<div style={{ marginTop: 25 }}>
				{data.files &&
					data.files.map((file) => (
						<ListItem key={file.name}>
							<ListItemIcon>
								<InsertDriveFile />
							</ListItemIcon>
							<ListItemText primary={file.name} secondary={file.size} />
						</ListItem>
					))}
			</div>

			<div style={{ marginTop: 25 }}>
				<ButtonSubmit onClick={() => setOpenAlert(true)}>
					Отправить данные
				</ButtonSubmit>
			</div>

			<div
				style={{
					display: 'flex',
					justifyContent: 'flex-end',
					marginTop: 25,
					marginBottom: 25,
				}}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step5')}
				>
					Вернуться назад
				</Button>
			</div>

			<Modal
				open={openAlert}
				onClose={() => setOpenAlert(false)}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				<Alert severity="success" className={classes.paper} style={modalStyle}>
					<AlertTitle>Success</AlertTitle>
					This is a success alert — <strong>check it out!</strong>
				</Alert>
			</Modal>
		</Header>
	);
};

// `Имя и фамилия:  ${data.firstName} ${data.lastName}`

// 'Email: ' `${data.email}`
// 'Номер телефона: ' `${data.tel}` || 'не указано'
// 'Аккаунт GitHub: ' `${data.github}` || 'не указано',
// 'Дата рождения: ' `${data.daySelect.label} ${monthDeclination[data.monthSelect.label]} ${
// 				data.yearSelect.label} `
// 'Регион проживания:' `${data.region.label}`
// 'Населённый пункт: ', `${data.city.label}`
// 'Навыки: ', `${convertArrayWithSkillsToStrings(data.skills)}`
// 'Несколько слов о себе:', `${data.info}`
// 'Родной язык: ', `${data.firstLanguage.label}`
// 'Иностранные языки: '`${first} ${second} ${third}`

export default Results;
