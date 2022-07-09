import React from 'react';
import cx from 'classnames';
import { secondaries } from './colors';

export default class extends React.Component {
	static defaultProps = {
		toggleColor: color => {
			console.log(color);
		}
	};
	state = {
		selectedIndex: secondaries[this.props.secondaryKey].defaultIndex
	};

	componentWillReceiveProps(nextProps) {
		const key = secondaries[nextProps.secondaryKey];
		if (nextProps.secondaryKey !== this.props.secondaryKey) {
			this.setState(
				{
					selectedIndex: key.defaultIndex
				},
				() => {
					this.props.toggleColor(key.palettes[this.state.selectedIndex].shade);
				}
			);
		}
	}

	handleClick = (i, c) => {
		this.setState({ selectedIndex: i }, () => {
			this.props.toggleColor(c);
		});
	};

	render() {
		const { secondaryKey } = this.props;
		const colors = secondaries[secondaryKey];
		return (
			!colors.hidePalette && (
				<div className="secondary-colors">
					<span className="color-label">pick a color</span>
					<div className="color-wrapper secondary-wrapper">
						{colors.palettes.map((c, i) => {
							const classNames = cx('swatch', 'secondary', {
								selected: i === this.state.selectedIndex
							});
							return (
								<div
									key={i}
									className={classNames}
									style={{ backgroundColor: c.shade }}
									onClick={() => this.handleClick(i, c.shade)}
								/>
							);
						})}
					</div>
				</div>
			)
		);
	}
}
