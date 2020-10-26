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

// Функция для склонения слов
export const declinationOfNumbers = (n) => (titles) =>
	n +
	' ' +
	titles[
		n % 10 === 1 && n % 100 !== 11
			? 0
			: n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)
			? 1
			: 2
	];
