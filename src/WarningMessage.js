import React from 'react';
import cx from 'classnames';

export default class extends React.PureComponent {
	render() {
		const { error } = this.props;
		const classNames = cx('warning-bubble', {
			error
		});
		return (
			<div className={classNames}>
				<p className="warning-text">
					{error ? (
						<span>
							<b>Oops:</b>You have reached the text limit for this field - the
							text highlighted in red will not be saved
						</span>
					) : (
						<span>
							<b>Tip:</b> Removing some text will make this easier to read
						</span>
					)}
				</p>
				{error ? null : (
					<React.Fragment>
						<input
							type="checkbox"
							onChange={this.props.handleChange}
							name="warning"
						/>
						<label for="warning">Don't show me this hint again</label>
					</React.Fragment>
				)}
			</div>
		);
	}
}
