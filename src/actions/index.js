export const getRegions = async () => {
	const res = await fetch('https://api.hh.ru/areas/113');
	return res.json();
};

export const getCities = async (id = 1) => {
	const res = await fetch(`https://api.hh.ru/areas/${id}`);
	if (!res.ok) {
		throw new Error('I can not fetch data');
	}
	return res.json();
};

export const getLanguages = async () => {
	const res = await fetch(`https://api.hh.ru/languages`);
	if (!res.ok) {
		throw new Error('I can not fetch data');
	}
	return res.json();
};
