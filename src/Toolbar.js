import { getSelectionCoords, getFlyoutCoords } from './utils';
import { Toolbar } from 'megadraft';
import 'megadraft/dist/css/megadraft.css';

class Coolbar extends Toolbar {
	componentWillReceiveProps(nextProps) {
		const currentContentState = this.props.editorState.getCurrentContent();
		const newContentState = nextProps.editorState.getCurrentContent();

		if (currentContentState === newContentState) {
			this.shouldUpdatePos = true;
			this.setState({
				show: true
			});
		}
	}

	setBarPosition() {
		const editor = this.props.editor;
		const toolbar = this.toolbarEl;
		const selectionCoords = getSelectionCoords(editor, toolbar);
		if (!selectionCoords) {
			return null;
		}

		if (
			(selectionCoords && !this.state.position) ||
			this.state.position.top !== selectionCoords.offsetTop ||
			this.state.position.left !== selectionCoords.offsetLeft ||
			this.state.arrowStyle !== selectionCoords.arrowStyle ||
			!this.state.show
		) {
			this.setState({
				show: true,
				position: {
					top: selectionCoords.offsetTop,
					left: selectionCoords.offsetLeft
				},
				arrowStyle: selectionCoords.arrowStyle
			});
		}
	}
}

export default Coolbar;
