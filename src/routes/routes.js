import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Step1 from '../components/Step1/Step1';
import Step2 from '../components/Step2/Step2';
import Step3 from '../components/Step3/Step3';
import Step4 from '../components/Step4/Step4';
import Step5 from '../components/Step5/Step5';
import Results from '../components/Results/Results';

const Routes = () => {
	return (
		<Switch>
			<Route path="/" component={Step1} exact />
			<Route path="/step2" component={Step2} />
			<Route path="/step3" component={Step3} />
			<Route path="/step4" component={Step4} />
			<Route path="/step5" component={Step5} />
			<Route path="/results" component={Results} />
		</Switch>
	);
};

export default Routes;
