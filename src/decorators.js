import React from 'react';
import { CompositeDecorator } from 'draft-js';
import { WarningSpan, DangerSpan } from './DecoratedText';

export const getDecorator = (warningLimit, errorLimit) =>
	new CompositeDecorator([
		{
			strategy(contentBlock, callback, contentState) {
				const text = contentBlock.getText();
				if (text.length < warningLimit) {
					callback(0, text.length);
				}
			},
			component: props => <span>{props.children}</span>
		},
		{
			strategy(contentBlock, callback, contentState) {
				const text = contentBlock.getText();
				if (text.length > warningLimit) {
					callback(warningLimit, errorLimit);
				}
			},
			component: WarningSpan
		},
		{
			strategy(contentBlock, callback, contentState) {
				const text = contentBlock.getText();
				callback(errorLimit, text.length);
			},
			component: DangerSpan
		}
	]);
