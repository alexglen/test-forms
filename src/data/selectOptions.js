import { getArrayWithNumbers } from '../utils';

export const days = getArrayWithNumbers(1, 31).map((el) => {
	return { label: el, value: el };
});

export const monthes = [
	{ value: 1, label: 'Январь' },
	{ value: 2, label: 'Февраль' },
	{ value: 3, label: 'Март' },
	{ value: 4, label: 'Апрель' },
	{ value: 5, label: 'Май' },
	{ value: 6, label: 'Июнь' },
	{ value: 7, label: 'Июль' },
	{ value: 8, label: 'Август' },
	{ value: 9, label: 'Сентябрь' },
	{ value: 10, label: 'Октябрь' },
	{ value: 11, label: 'Ноябрь' },
	{ value: 12, label: 'Декабрь' },
];

export const years = getArrayWithNumbers(1940, 2001).map((el) => {
	return { label: el, value: el };
});

export const skills = [
	{ value: 'html', label: 'HTML' },
	{ value: 'js', label: 'JavaScript' },
	{ value: 'css', label: 'CSS' },
	{ value: 'react', label: 'React JS' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'vue', label: 'Vue JS' },
	{ value: 'jquery', label: 'JQuery' },
	{ value: 'photoshop', label: 'Adobe PhotoShop' },
	{ value: 'wordpress', label: 'Wordpress' },
	{ value: 'python', label: 'Python' },
	{ value: 'ооп', label: 'ООП' },
	{ value: 'linux', label: 'Linux' },
];

export const skillsLanguage = [
	{ value: 'a1', label: 'А1 - Начальный' },
	{ value: 'a2', label: 'А2 - Элементарный' },
	{ value: 'b1', label: 'В1 - Средний' },
	{ value: 'b2', label: 'В2 - Средне-продвинутый' },
	{ value: 'c1', label: 'С1 - Продвинутый' },
	{ value: 'c2', label: 'С2 - В совершенстве' },
];

export const monthDeclination = {
	Январь: 'Января',
	Февраль: 'Февраля',
	Март: 'Марта',
	Апрель: 'Апреля',
	Май: 'Мая',
	Июнь: 'Июня',
	Июль: 'Июля',
	Август: 'Августа',
	Сентябрь: 'Сентября',
	Октябрь: 'Октября',
	Ноябрь: 'Ноября',
	Декабрь: 'Декабря',
};
