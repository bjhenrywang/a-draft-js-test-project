import React from 'react';
import ReactDOM from 'react-dom';
import { Element } from './Element';
import ColorPicker from './ColorPicker';
import Flyout from './Flyout';

import './styles.css';

function App() {
	return (
		<div className="App">
			<h1>Hello CodeSandbox</h1>
			<Element />
		</div>
	);
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
