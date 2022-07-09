import cxs from 'cxs';

export function blockStyleFn(contentBlock) {
	const type = contentBlock.getType();
	switch (type) {
		case ['small']:
			cxs({ fontSize: '14px' });
		default:
	}
}
