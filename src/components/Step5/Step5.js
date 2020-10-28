/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useData } from '../../context';
import { getLanguages } from '../../actions';
import { Autocomplete } from '@material-ui/lab';
import { Button } from '@material-ui/core';
import ButtonSubmit from '../../ui/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Header from '../../Layouts/Header';
import IconButton from '@material-ui/core/IconButton';
import SelectApp from '../../ui/Select';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { skills, skillsLanguage } from '../../data/selectOptions';
import { changeOrderOfObjectsInArray } from '../../utils';
import ComeBackButton from '../../ui/ComeBackButton';

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		margin: '0 auto',
		marginBottom: 15,
		'& > * + *': {
			marginTop: theme.spacing(3),
		},
	},
	textarea: {
		width: '100%',
		marginBottom: 15,
	},
}));

const schema = yup.object().shape({
	skills: yup.array().required(''),
	firstLanguage: yup.object().required(''),
	info: yup.string().required('Напишите несколько слов о себе и своём опыте'),
	1: yup.object(),
	10: yup.object(),
	2: yup.object(),
	20: yup.object(),
	3: yup.object(),
	30: yup.object(),
});

const Step5 = () => {
	const classes = useStyles();
	const { data, addData } = useData();

	const history = useHistory();
	const [languages, setLanguages] = useState([]);
	const [limit, setLimit] = useState({ first: 0, last: 1 });

	// eslint-disable-next-line no-unused-vars
	const [numberSelectsForLanguages, setNumberSelectsForLanguages] = useState([
		{ value: '1', id: '10' },
		{ value: '2', id: '20' },
		{ value: '3', id: '30' },
	]);

	useEffect(() => {
		getLanguages().then((res) => setLanguages(res));
	}, []);

	const { handleSubmit, errors, control } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			skills: data.skills,
			info: data.info,
			firstLanguage: data.firstLanguage,
			1: data['1'],
			10: data['10'],
			2: data['2'],
			20: data['20'],
			3: data['3'],
			30: data['30'],
		},
	});

	const onSubmit = (data) => {
		addData(data);
		history.push('/results');
	};

	return (
		<Header>
			<h1>Шаг 5</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Ваши навыки</h3>
				<div className={classes.root}>
					<Controller
						render={({ onChange, ...props }) => (
							<Autocomplete
								multiple
								options={skills}
								getOptionLabel={(option) => option.label}
								onChange={(e, data) => onChange(data)}
								{...props}
								renderInput={(params) => (
									<TextField {...params} label="Ваши навыки" margin="normal" />
								)}
							/>
						)}
						onChange={([, data]) => data}
						name="skills"
						control={control}
					/>
				</div>
				<div>
					<Controller
						name="info"
						control={control}
						as={
							<TextField
								id="outlined-multiline-static"
								label=""
								multiline
								rows={4}
								placeholder="Напишите несколько слов о себе и своих прошлых проектах"
								variant="outlined"
								className={classes.textarea}
								error={!!errors.info}
								helperText={errors?.info?.message}
							/>
						}
					/>
				</div>
				<h2>Знание языков</h2>
				<div>
					<h3>Родной язык</h3>
					<div>
						<SelectApp
							name="firstLanguage"
							options={
								languages?.length &&
								changeOrderOfObjectsInArray(languages).map(({ id, name }) => ({
									value: id,
									label: name,
								}))
							}
							control={control}
							width={220}
							placeholder="Ваш родной язык"
						/>
					</div>
				</div>
				<div>
					<div>
						<h3>Иностранные языки</h3>
						{numberSelectsForLanguages
							.slice(limit.first, limit.last)
							.map(({ value, id }) => (
								<div
									key={value}
									style={{ display: 'flex', alignItems: 'center' }}
								>
									<div>
										<SelectApp
											name={value}
											options={
												languages?.length &&
												changeOrderOfObjectsInArray(languages).map(
													({ id, name }) => ({
														value: id,
														label: name,
													})
												)
											}
											control={control}
											width={220}
											defaultValue="English"
										/>
									</div>
									<div style={{ marginLeft: 25 }}>
										<SelectApp
											name={id}
											options={skillsLanguage}
											control={control}
											width={220}
										/>
									</div>

									{value == limit.last && (
										<IconButton
											aria-label="delete"
											style={{ marginBottom: '1rem' }}
											onClick={() =>
												setLimit((limit) => ({
													...limit,
													last: limit.last - 1,
												}))
											}
										>
											<DeleteIcon />
										</IconButton>
									)}
								</div>
							))}
					</div>
					{limit.last < 3 && (
						<Button
							href="#text-buttons"
							color="primary"
							onClick={() =>
								setLimit((limit) => ({ ...limit, last: limit.last + 1 }))
							}
						>
							Указать ещё один язык
						</Button>
					)}
				</div>

				<ButtonSubmit type="onSubmit">Далее</ButtonSubmit>
			</form>
			<ComeBackButton path="/step4" />
		</Header>
	);
};

export default Step5;
