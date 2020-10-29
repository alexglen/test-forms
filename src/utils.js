import parsePhoneNumberFromString from 'libphonenumber-js';
import { monthDeclination } from './data/selectOptions';

export const normalizePhoneNumber = (val) => {
  const phoneNumber = parsePhoneNumberFromString(val);
  if (!phoneNumber) {
    return val;
  } else {
    return phoneNumber.formatInternational();
  }
};

export const getArrayWithNumbers = (first, last) => {
  let arr = [];
  for (let i = first; i <= last; i++) {
    arr.push(i);
  }
  return arr;
};

export const getRegionsForSelect = (arr) =>
  arr.map(({ name, id }) => ({ value: id, label: name }));

export const convertArrayWithSkillsToStrings = (arr) =>
  arr.map((arr) => arr.label).join(', ');

export const changeOrderOfObjectsInArray = (arr) => {
  const objRussian = arr.find((el) => el.id === 'rus');
  const objEnglish = arr.find((el) => el.id === 'eng');
  const objGerman = arr.find((el) => el.id === 'deu');
  const objSpanish = arr.find((el) => el.id === 'spa');
  return [
    objRussian,
    objEnglish,
    objGerman,
    objSpanish,
    ...arr.filter(
      (el) =>
        el.id !== 'rus' || el.id !== 'eng' || el.id !== 'deu' || el.id !== 'spa'
    ),
  ];
};

export const getModalStyle = () => {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
};

export const createData = (name, value) => {
  return {
    name,
    value,
  };
};

export const getForeignLanguages = (data) => {
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
  return `${first} ${second} ${third}`;
};

export const getRespond = (data) => {
  return (
    <div>
      <p>
        <strong>Имя и фамилия:</strong>
        {` ${data.firstName} ${data.lastName}`}
      </p>
      <p>
        <strong>Email:</strong>
        {` ${data?.email && data.email}`}
      </p>
      <p>
        <strong>Номер телефона:</strong>
        {` ${data.tel || 'не указано'}`}
      </p>
      <p>
        <strong>Аккаунт GitHub:</strong>
        {` ${data.github || 'не указано'}`}
      </p>
      <p>
        <strong>Дата рождения:</strong>
        {` ${data.daySelect.label} ${
          monthDeclination[data.monthSelect.label]
        } ${data.yearSelect.label}`}
      </p>
      <p>
        <strong>Регион проживания: </strong>
        {` ${data.region.label}`}
      </p>
      <p>
        <strong>Населённый пункт: </strong>
        {` ${data.city.label}`}
      </p>
      <p>
        <strong>Навыки:</strong>
        {` ${convertArrayWithSkillsToStrings(data.skills)}`}
      </p>
      <p>
        <strong>Несколько слов о себе:</strong>
        {` ${data.info}`}
      </p>
      <p>
        <strong>Родной язык:</strong>
        {` ${data.firstLanguage.label}`}
      </p>
      <p>
        <strong>Иностранные языки:</strong>
        {` ${getForeignLanguages(data)}`}
      </p>
    </div>
  );
};
