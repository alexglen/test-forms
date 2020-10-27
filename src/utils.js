import parsePhoneNumberFromString from 'libphonenumber-js';

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

function rand() {
	return Math.round(Math.random() * 20) - 10;
}

export const getModalStyle = () => {
	const top = 50 + rand();
	const left = 50 + rand();

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
