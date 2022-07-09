export function getSelectionCoords(editor, toolbar) {
	const editorBounds = editor.getBoundingClientRect();
	const toolbarWidth = toolbar.offsetWidth;

	if (!editorBounds || !toolbar) {
		return null;
	}

	const width = editorBounds.width - toolbarWidth;

	const alignment = window
		.getComputedStyle(editor)
		.getPropertyValue('text-align');

	const offsetLeft =
		alignment === 'center' ? width / 2 : alignment === 'right' ? width : '0';

	return { offsetLeft, offsetTop: '-12px', arrowStyle: {} };
}
