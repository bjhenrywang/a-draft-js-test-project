import React from 'react';
import cx from 'classnames';
import { primaries } from './colors';
import SecondaryPicker from './SecondaryPicker';

export default class extends React.Component {
	state = {
		selectedIndex: 0
	};
	render() {
		return (
			<div className="color-picker">
				<div className="color-wrapper primary-wrapper">
					{primaries.map((c, i) => {
						const classNames = cx('swatch', 'primary', {
							selected: i === this.state.selectedIndex
						});
						return (
							<div
								key={i}
								className={classNames}
								style={{ backgroundColor: c.shade }}
								onClick={() => this.setState({ selectedIndex: i })}
							/>
						);
					})}
				</div>
				<SecondaryPicker
					toggleColor={this.props.toggleColor}
					secondaryKey={primaries[this.state.selectedIndex].id}
				/>
			</div>
		);
	}
}
