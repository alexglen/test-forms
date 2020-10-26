import { Button } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import Header from '../../Layouts/Header';
import { Autocomplete } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import ButtonSubmit from '../../ui/Button';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { skills, skillsLanguage } from '../../data/selectOptions';
import { getLanguages } from '../../actions';
import SelectApp from '../../ui/Select';
import { useData } from '../../context';

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
	// monthSelect: yup.object().required(''),
	// yearSelect: yup.object().required(''),
	// region: yup.object().required(''),
	// city: yup.object().required(''),
});

const Step5 = () => {
	const classes = useStyles();
	const { data, addData } = useData();
	const history = useHistory();
	const [languages, setLanguages] = useState([]);
	const [numberSelectsForLanguages, setNumberSelectsForLanguages] = useState([
		'1',
	]);

	useEffect(() => {
		getLanguages().then((res) => setLanguages(res));
	}, []);
	const { handleSubmit, errors, control } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		// defaultValues: {
		// 	daySelect: data.daySelect,
		// 	monthSelect: data.monthSelect,
		// 	yearSelect: data.yearSelect,
		// 	region: data.region,
		// 	city: data.city,
		// },
	});

	const onSubmit = (data) => {
		addData(data);
		history.push('/results');
	};

	return (
		<Header>
			<h1>step5</h1>
			<form onSubmit={handleSubmit(onSubmit)}>
				<h3>Your skills</h3>
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
									<TextField {...params} label="My label" margin="normal" />
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
								label="Some words about you"
								multiline
								rows={4}
								placeholder="Write about yourself"
								variant="outlined"
								className={classes.textarea}
							/>
						}
					/>
				</div>
				<h3>Languages</h3>
				<div>
					<p>First language</p>
					<SelectApp
						name="firstLanguage"
						options={languages.map(({ id, name }) => ({
							value: id,
							label: name,
						}))}
						control={control}
						width={220}
					/>
				</div>
				<div>
					<div>
						<p>Foreign languages</p>
						{numberSelectsForLanguages.map((id) => (
							<div key={id}>
								<SelectApp
									name={id}
									options={languages.map(({ id, name }) => ({
										value: id,
										label: name,
									}))}
									control={control}
									width={220}
									defaultValue="English"
								/>
								<SelectApp
									name={String(Number(id) + 1)}
									options={skillsLanguage}
									control={control}
									width={220}
								/>
							</div>
						))}
						<Button
							href="#text-buttons"
							color="primary"
							onClick={() =>
								setNumberSelectsForLanguages((p) => [...p, String(+p + 1)])
							}
						>
							Add new language
						</Button>
					</div>
				</div>

				<ButtonSubmit type="onSubmit">Next step</ButtonSubmit>
			</form>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/step4')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Step5;
