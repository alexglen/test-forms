import React, { useState } from 'react';
import { useData } from '../../context';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Alert, AlertTitle } from '@material-ui/lab';
import ButtonSubmit from '../../ui/Button';
import Header from '../../Layouts/Header';
import { ListItem, ListItemIcon, ListItemText, Modal } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { convertArrayWithSkillsToStrings, createData } from '../../utils';
import { monthDeclination } from '../../data/selectOptions';
import { getModalStyle, getRespond, getForeignLanguages } from '../../utils';
import { InsertDriveFile } from '@material-ui/icons';
import ComeBackButton from '../../ui/ComeBackButton';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    margin: '0 auto',
  },
  table: {
    width: '90%',
    margin: '0 auto',
  },
}));

const Results = () => {
  const classes = useStyles();
  const { data } = useData();

  const [openModal, setOpenModal] = useState(false);
  const [modalStyle] = useState(getModalStyle);

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
    createData('Иностранные языки', `${getForeignLanguages(data)}}`),
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
                  style={{ fontStyle: 'italic', fontSize: '1.125rem' }}
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
        {data.files.length ? <h3>Список прикреплённых файлов</h3> : null}
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
        <ButtonSubmit onClick={() => setOpenModal(true)}>
          Отправить данные
        </ButtonSubmit>
      </div>

      <ComeBackButton path="/step5" />

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <Alert severity="success" className={classes.paper} style={modalStyle}>
          <AlertTitle>Ваши данные отправлены</AlertTitle>
          {getRespond(data)}
        </Alert>
      </Modal>
    </Header>
  );
};

export default Results;
