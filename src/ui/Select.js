import React from 'react';
import Select from 'react-select';
import { Controller } from 'react-hook-form';

const SelectApp = ({
	name,
	options,
	control,
	width,
	placeholder,
	defaultValue,
}) => {
	return (
		<div style={{ marginBottom: 15, width, display: 'inline-block' }}>
			<Controller
				name={name}
				as={Select}
				options={options}
				control={control}
				rules={{ required: true }}
				placeholder={placeholder}
				renderValue={(selected) => selected.join(', ')}
			/>
		</div>
	);
};

export default SelectApp;
