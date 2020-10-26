import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Header from '../../Layouts/Header';
import Input from '../../ui/Input';
import ButtonSubmit from '../../ui/Button';
import { useForm } from 'react-hook-form';
import { Button, Checkbox } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { normalizePhoneNumber } from '../../utils';
import AvatarApp from '../../ui/Avatar';
import { useData } from '../../context';

const schema = yup.object().shape({
	email: yup
		.string()
		.email('Write your correct email')
		.required('Write your email'),
});

const Step2 = () => {
	const history = useHistory();
	const { data, addData } = useData();
	const [checked, setChecked] = useState({
		checkboxTel: !!data.tel,
		checkboxGit: !!data.github,
	});
	const { register, handleSubmit, errors } = useForm({
		mode: 'onBlur',
		resolver: yupResolver(schema),
		defaultValues: {
			email: data.email,
			tel: data.tel,
			github: data.github,
		},
	});

	const onSubmit = (data) => {
		console.log('data', data);
		history.push('./step3');
		addData({ tel: '', github: '', ...data });
	};
	return (
		<Header>
			<h2>Step2</h2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<AvatarApp />
				<Input
					label="Write your mail"
					ref={register}
					id="email"
					name="email"
					type="email"
					error={!!errors.email}
					helperText={errors?.email?.message}
					required
				/>
				<div>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked.checkboxTel}
								onChange={(event) =>
									setChecked({
										...checked,
										[event.target.name]: event.target.checked,
									})
								}
								name="checkboxTel"
								color="primary"
							/>
						}
						label="Do you want to write your phone number?"
					/>
				</div>

				{checked.checkboxTel && (
					<Input
						label="Write your phone number"
						ref={register}
						id="tel"
						name="tel"
						type="tel"
						onChange={({ target: { value } }) =>
							(value = normalizePhoneNumber(value))
						}
					/>
				)}

				<div>
					<FormControlLabel
						control={
							<Checkbox
								checked={checked.checkboxGit}
								onChange={(event) =>
									setChecked({
										...checked,
										[event.target.name]: event.target.checked,
									})
								}
								name="checkboxGit"
								color="primary"
							/>
						}
						label="Do you want to write your github account?"
					/>
					{checked.checkboxGit && (
						<Input
							label="Write your github account"
							ref={register}
							id="github"
							name="github"
							type="url"
						/>
					)}
				</div>
				<ButtonSubmit type="submit">Next step</ButtonSubmit>
			</form>
			<div
				style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 25 }}
			>
				<Button
					variant="contained"
					color="secondary"
					onClick={() => history.push('/')}
				>
					Return back
				</Button>
			</div>
		</Header>
	);
};

export default Step2;
