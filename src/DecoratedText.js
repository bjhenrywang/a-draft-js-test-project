import React from 'react';

export const ColoredText = ({ style, children }) => {
	return <span style={style}>{children}</span>;
};

export const WarningSpan = props => {
	return (
		<span className="warning-highlight" data-offset-key={props.offsetKey}>
			{props.children}
		</span>
	);
};

export const DangerSpan = props => {
	return (
		<span className="error-highlight" data-offset-key={props.offsetKey}>
			{props.children}
		</span>
	);
};
