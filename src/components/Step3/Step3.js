/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from '../../context';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { getCities, getRegions } from '../../actions';
import ButtonSubmit from '../../ui/Button';
import ComeBackButton from '../../ui/ComeBackButton';
import Header from '../../Layouts/Header';
import SelectApp from '../../ui/Select';
import { days, monthes, years } from '../../data/selectOptions';
import { getRegionsForSelect } from '../../utils';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		justifyContent: 'space-between',
	},
}));

const schema = yup.object().shape({
	daySelect: yup.object().required(''),
	monthSelect: yup.object().required(''),
	yearSelect: yup.object().required(''),
	region: yup.object().required(''),
	city: yup.object().required(''),
});

const Step3 = () => {
	const history = useHistory();
	const { data, addData } = useData();

	const [regions, setRegions] = useState([]);
	const [cities, setCities] = useState([]);

	useEffect(() => {
		getRegions().then((res) => setRegions(res.areas));
	}, []);

	const { handleSubmit, errors, control, watch } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			daySelect: data.daySelect,
			monthSelect: data.monthSelect,
			yearSelect: data.yearSelect,
			region: data.region,
			city: data.city,
		},
	});

	useEffect(() => {
		Promise.resolve(watch('region', 1))
			.then((res) => getCities(res.value))
			.then((body) => setCities(body.areas))
			.catch((error) => console.log(error));
	}, [watch('region')]);

	const onSubmit = (data) => {
		history.push('/step4');
		addData(data);
	};

	const classes = useStyles();

	return (
		<Header>
			<h2>Шаг 3</h2>
			<h3>Дата рождения</h3>
			<p>
				Мы не передаем данные о вашей дате рождения третьим лицам. Операции на
				платформе выполняются лицами, достигшими 18-летнего возраста.
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className={classes.root}>
					<SelectApp
						name="daySelect"
						options={days}
						control={control}
						width={220}
						placeholder="День рождения"
					/>
					<SelectApp
						name="monthSelect"
						options={monthes}
						control={control}
						width={220}
						placeholder="Месяц рождения"
					/>
					<SelectApp
						name="yearSelect"
						options={years}
						control={control}
						width={220}
						placeholder="Год рождения"
					/>
				</div>

				<h3>Где Вы проживаете?</h3>
				<div>
					<div>
						<SelectApp
							name="region"
							options={regions?.length && getRegionsForSelect(regions)}
							control={control}
							width={'100%'}
							placeholder={'Регион проживания'}
						/>
					</div>
					<div>
						<SelectApp
							name="city"
							control={control}
							width={'100%'}
							placeholder={'Населённый пункт'}
							options={cities?.length && getRegionsForSelect(cities)}
						/>
					</div>
				</div>

				<ButtonSubmit type="submit">Далее</ButtonSubmit>
			</form>
			{Object.keys(errors).length ? (
				<p style={{ color: 'red' }}>Вы ответили не на все вопросы</p>
			) : null}
			<ComeBackButton path="/step2" />
		</Header>
	);
};

export default Step3;
