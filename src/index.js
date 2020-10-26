import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { DataContainer } from './context';

import './index.css';

ReactDOM.render(
	<DataContainer>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</DataContainer>,
	document.getElementById('root')
);
