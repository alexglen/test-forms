import React, { createContext, useState, useContext } from 'react';

export const DataContext = createContext();

export const DataContainer = ({ children }) => {
	const [data, setData] = useState([]);
	const addData = (value) => {
		setData((p) => ({ ...p, ...value }));
	};

	return (
		<DataContext.Provider value={{ data, addData }}>
			{children}
		</DataContext.Provider>
	);
};

export const useData = () => useContext(DataContext);
