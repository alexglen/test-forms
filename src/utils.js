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
