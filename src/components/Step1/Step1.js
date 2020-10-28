import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from '../../context';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ButtonSubmit from '../../ui/Button';
import Header from '../../Layouts/Header';
import Input from '../../ui/Input';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Ваше имя содержит некорректные символы')
		.required('Напишите Ваше имя'),
	lastName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Ваша фамилия содержит некорректные символы')
		.required('Напишите Вашу фамилию'),
});

const Step1 = () => {
	const { data, addData } = useData();

	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			firstName: data.firstName,
			lastName: data.lastName,
		},
	});
	const history = useHistory();

	const onSubmit = (data) => {
		history.push('./step2');
		addData(data);
	};

	return (
		<Header>
			<h2>Шаг 1</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Ваше имя"
					ref={register}
					id="firstName"
					name="firstName"
					type="text"
					error={!!errors.firstName}
					helperText={errors?.firstName?.message}
				/>
				<Input
					label="Ваша фамилия"
					ref={register}
					id="lastName"
					name="lastName"
					type="text"
					error={!!errors.lastName}
					helperText={errors?.lastName?.message}
				/>
				<ButtonSubmit type="submit">Далее</ButtonSubmit>
			</form>
		</Header>
	);
};

export default Step1;
