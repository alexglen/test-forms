/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { days, monthes, years } from '../../data/selectOptions';
import Header from '../../Layouts/Header';
import ButtonSubmit from '../../ui/Button';
import SelectApp from '../../ui/Select';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { getCities, getRegions } from '../../actions';
import { getRegionsForSelect } from '../../utils';
import { Button } from '@material-ui/core';
import { useData } from '../../context';

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

	return (
		<Header>
			<h2>step3</h2>
			<h3>Your date of birth </h3>
			<p>
				We do not share data about your date of birth. Operations on the
				platform are performed by persons who have reached the age of 18
			</p>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div style={{ display: 'flex', justifyContent: 'space-between' }}>
					<SelectApp
						name="daySelect"
						options={days}
						control={control}
						width={220}
					/>
					<SelectApp
						name="monthSelect"
						options={monthes}
						control={control}
						width={220}
					/>
					<SelectApp
						name="yearSelect"
						options={years}
						control={control}
						width={220}
					/>
				</div>

				<h3>Your sex</h3>

				<h3>What do you think?</h3>
				<div>
					<div>
						<SelectApp
							name="region"
							options={regions?.length && getRegionsForSelect(regions)}
							control={control}
							width={'100%'}
							placeholder={'Your region'}
						/>
					</div>
					<div>
						<SelectApp
							name="city"
							control={control}
							width={'100%'}
							placeholder={'Your city'}
							options={cities?.length && getRegionsForSelect(cities)}
						/>
					</div>
				</div>

				<ButtonSubmit type="submit">Next step</ButtonSubmit>
			</form>
			{Object.keys(errors).length ? (
				<p style={{ color: 'tomato' }}>Choose all the selects</p>
			) : null}
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step2')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Step3;
