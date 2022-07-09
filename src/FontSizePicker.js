import React from 'react';

const fontSizeMap = {
	1: '12px',
	2: '14px',
	3: '16px',
	4: '24px',
	5: '32px'
};

const icons = {
	small: (
		<svg className="custom-icon" width={10} height={10}>
			<polygon fill="#FFF" points="0 2 3 2 3 8 5 8 5 2 8 2 8 0 0 0" />
		</svg>
	),
	large: (
		<svg className="custom-icon" width={14} height={16}>
			<polygon fill="#FFF" points="0 0 0 2 4 2 4 12 6 12 6 2 10 2 10 0" />
		</svg>
	)
};

export default class extends React.Component {
	state = {
		value: 3
	};
	handleChange = ({ target: { value } }) => {
		this.setState({ value }, () => {
			this.props.setFontSize(fontSizeMap[this.state.value]);
		});
	};

	render() {
		return (
			<div className="range-input-wrapper">
				{icons.small}
				<input
					type="range"
					min="1"
					max="5"
					value={this.state.value}
					onChange={this.handleChange}
				/>
				{icons.large}
			</div>
		);
	}
}
