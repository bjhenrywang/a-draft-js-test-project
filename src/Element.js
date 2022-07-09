import React from "react";
import cx from "classnames";
import { ContentState, convertToRaw, RichUtils } from "draft-js";
import { MegadraftEditor, editorStateFromRaw } from "megadraft";
import CustomToolbar from "./Toolbar";
import { getDecorator } from "./decorators";
import WarningMessage from "./WarningMessage";
import ColorPicker from "./ColorPicker";
import FontSizePicker from "./FontSizePicker";
import Flyout from "./Flyout";
import actions from "./actions";
import { customStylesPlugin } from "./customStyles";
import { blockStyleFn } from "./blockStyles";
import "megadraft/dist/css/megadraft.css";

export class Element extends React.Component {
  static defaultProps = {
    textLimitWarning: 200,
    textLimitError: 500,
    placeholder: "Enter some text",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo in.",
    handleChange: () => {}
  };

  constructor() {
    super(...arguments);
    this.state = {
      length: this.props.value.length,
      isFocused: false,
      warningEnabled: true,
      flyoutOpen: false,
      showColorPicker: false,
      showFontSizePicker: false,
      editorState: editorStateFromRaw(
        convertToRaw(ContentState.createFromText(this.props.value)),
        getDecorator(this.props.textLimitWarning, this.props.textLimitError)
      )
    };

    // Step 1: Create the functions to get and update the editorState
    this.updateEditorState = editorState => this.setState({ editorState });
    this.getEditorState = () => this.state.editorState;

    // Step 2: run the colorPickerPlugin function
    this.picker = customStylesPlugin(
      this.updateEditorState,
      this.getEditorState
    );
  }

  onChange = editorState => {
    console.log(RichUtils.getCurrentBlockType(editorState));
    const length = editorState.getCurrentContent().getPlainText("").length;
    this.setState({ editorState, length });
  };

  handleBlur = e => {
    const hasText = this.state.editorState.getCurrentContent().hasText();
    this.props.handleChange(hasText);
  };

  handleChange = () => {
    this.setState({ warningEnabled: false });
  };

  showFlyout = () => {
    this.setState({ flyoutOpen: true });
  };

  closeFlyout = () => {
    this.setState({
      flyoutOpen: false,
      showColorPicker: false,
      showFontSizePicker: false
    });
    this.editor.draftEl.focus();
  };

  handleFocus = () => {
    this.setState({ isFocused: true });
  };

  handleBlur = () => {
    if (this.state.flyoutOpen) {
      this.setState({ isFocused: true });
    } else {
      this.setState({ isFocused: false });
    }
  };

  render() {
    const {
      editorState,
      isFocused,
      length,
      warningEnabled,
      flyoutOpen,
      showColorPicker,
      showFontSizePicker
    } = this.state;
    const { textLimitWarning, textLimitError } = this.props;
    const warning = length > textLimitWarning;
    const error = length > textLimitError;
    const self = this;
    const color = this.picker.currentColor(editorState);
    const ColorPickerIcon = () => (
      <svg className="custom-icon color-icon" width={16} height={16}>
        <polygon
          fill={color || "#FFF"}
          points="0 12.986 16 12.986 16 15.768 0 15.768"
        />
        <path
          fill="#FFF"
          d="M8.889 0H7.11l-4 11.13H4.89l.995-2.782h4.223l.995 2.782h1.778L8.889 0zM6.56 6.493L8 2.477l1.44 4.016H6.56z"
        />
      </svg>
    );

    const FontSizeIcon = () => (
      <svg className="custom-icon" width={16} height={12}>
        <path fill="#FFF" d="M0 6h3v6h2V6h3V4H0v2zm6-6v2h4v10h2V2h4V0H6z" />
      </svg>
    );

    const customActions = actions.concat([
      {
        type: "custom",
        icon: ColorPickerIcon,
        action(editorState, onChange) {
          // Here goes the code triggered on button click
          self.setState({ flyoutOpen: true, showColorPicker: true });
        }
      },
      {
        type: "custom",
        icon: FontSizeIcon,
        action(editorState, onChange) {
          // Here goes the code triggered on button click
          self.setState({ flyoutOpen: true, showFontSizePicker: true });
        }
      }
    ]);

    const classnames = cx("element", {
      focused: isFocused,
      warning,
      error
    });

    return (
      <span className={classnames} ref={el => (this.el = el)}>
        {((warning && warningEnabled) || error) && (
          <WarningMessage
            el={this.el}
            error={error}
            handleChange={this.handleChange}
          />
        )}
        <MegadraftEditor
          ref={el => (this.editor = el)}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          shouldDisplayToolbarFn={() => isFocused || flyoutOpen}
          customStyleFn={this.picker.customStyleFn}
          blockStyleFn={blockStyleFn}
          placeholder={this.props.placeholder}
          editorState={editorState}
          onChange={this.onChange}
          sidebarRendererFn={() => null}
          Toolbar={CustomToolbar}
          actions={customActions}
          {...this.props}
        />
        {flyoutOpen && (
          <Flyout
            editorEl={this.editor.draftEl}
            closeFlyout={this.closeFlyout}
            resetStyles={() => {
              console.log(...arguments);
              this.picker.removeColor();
              this.picker.removeFontSize();
            }}
          >
            {showColorPicker && (
              <ColorPicker toggleColor={color => this.picker.addColor(color)} />
            )}
            {showFontSizePicker && (
              <FontSizePicker
                setFontSize={size => this.picker.addFontSize(size)}
              />
            )}
          </Flyout>
        )}
      </span>
    );
  }
}
