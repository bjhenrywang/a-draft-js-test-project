import { EditorState, SelectionState } from "draft-js";
import createStyles from "draft-js-custom-styles";

const { styles, customStyleFn, exporter } = createStyles(
  ["color", "fontSize"],
  "CUSTOM_"
);

const addColor = (updateEditorState, getEditorState) => color => {
  return updateEditorState(styles.color.add(getEditorState(), color));
};

const removeColor = (updateEditorState, getEditorState) => () => {
  return updateEditorState(styles.color.remove(getEditorState()));
};

const currentColor = getEditorState => () =>
  styles.color.current(getEditorState());

const addFontSize = (updateEditorState, getEditorState) => size => {
  return updateEditorState(styles.fontSize.add(getEditorState(), size));
};

const removeFontSize = (updateEditorState, getEditorState) => () => {
  return updateEditorState(styles.fontSize.remove(getEditorState()));
};

const currentFontSize = getEditorState => () =>
  styles.fontSize.current(getEditorState());

export const customStylesPlugin = (updateEditorState, getEditorState) => ({
  addColor: addColor(updateEditorState, getEditorState),
  removeColor: removeColor(updateEditorState, getEditorState),
  currentColor: currentColor(getEditorState),
  addFontSize: addFontSize(updateEditorState, getEditorState),
  removeFontSize: removeFontSize(updateEditorState, getEditorState),
  currentFontSize: currentFontSize(getEditorState),
  customStyleFn,
  exporter
});
