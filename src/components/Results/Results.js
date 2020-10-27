import React from 'react';
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
import { convertArrayWithSkillsToStrings } from '../../utils';
import { monthDeclination } from '../../data/selectOptions';
import ButtonSubmit from '../../ui/Button';
import { Button } from '@material-ui/core';

const useStyles = makeStyles({
	table: {
		width: '80%',
		margin: '0 auto',
	},
});

function createData(name, value) {
	return {
		name,
		value,
	};
}

const Results = () => {
	const history = useHistory();
	const classes = useStyles();
	const { data } = useData();

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
		createData('Иностранные языки', '1'),
	];

	const sendData = () => {
		alert(JSON.stringify(data));
	};

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
				<ButtonSubmit onClick={sendData}>Отправить данные</ButtonSubmit>
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
		</Header>
	);
};

export default Results;
