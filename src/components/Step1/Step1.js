import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../../Layouts/Header';
import Input from '../../ui/Input';
import ButtonSubmit from '../../ui/Button';
import { useData } from '../../context';

const schema = yup.object().shape({
	firstName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Write your correct first name')
		.required('Write your first name'),
	lastName: yup
		.string()
		.matches(/^([^0-9]*)$/, 'Write your correct last name')
		.required('Write your last name'),
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
			<h2>Step1</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					label="Write your first name"
					ref={register}
					id="firstName"
					name="firstName"
					type="text"
					error={!!errors.firstName}
					helperText={errors?.firstName?.message}
				/>
				<Input
					label="Write your last name"
					ref={register}
					id="lastName"
					name="lastName"
					type="text"
					error={!!errors.lastName}
					helperText={errors?.lastName?.message}
				/>
				<ButtonSubmit type="submit">Next step</ButtonSubmit>
			</form>
		</Header>
	);
};

export default Step1;
