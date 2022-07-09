import React from 'react';
import { getVisibleSelectionRect } from 'draft-js';

export default class extends React.Component {
	constructor() {
		super(...arguments);
		this.el = React.createRef();
		const { left, right, bottom } = getVisibleSelectionRect(window);
		this.state = {
			bottom: bottom || 0,
			left: left || 0,
			right: right || 0
		};
	}
	componentDidMount() {
		document.addEventListener('click', this.handleClick);
	}
	componentWillUnmount() {
		document.removeEventListener('click', this.handleClick);
	}

	handleClick = e => {
		if (!this.el.current.contains(e.target)) {
			this.props.closeFlyout();
		}
	};
	render() {
		const { bottom, left, right } = this.state;
		const leftBound = (left + right) / 2;
		const leftPos = leftBound > 150 ? leftBound : 150;
		return (
			<div
				ref={this.el}
				className="flyout"
				style={{
					position: 'fixed',
					left: leftPos,
					transform: 'translateX(-50%)',
					top: bottom + 20
				}}>
				<div className="flyout-content">
					{this.props.children}
					<div className="button-wrapper">
						<button className="link-button" onClick={this.props.resetStyles}>
							Reset Selection
						</button>
						<button className="brand-button" onClick={this.props.closeFlyout}>
							Ok
						</button>
					</div>
				</div>
			</div>
		);
	}
}
