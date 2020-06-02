import styled, { css } from 'styled-components';

import {
  disabledStyle,
  getInputPadBySide,
  focusStyle,
  inputStyle,
  parseMetricToNum,
  placeholderStyle,
} from '../../utils';
import { defaultProps } from '../../default-props';

const sizeStyle = props => {
  const data = props.theme.text[props.size];
  return css`
    font-size: ${data.size};
    line-height: ${data.height};
  `;
};

const plainStyle = css`
  outline: none;
  border: none;
`;

const StyledTextInput = styled.input`
  ${inputStyle} width: 100%;

  ${props => props.size && sizeStyle(props)}
  ${props => props.plain && plainStyle}

  ${placeholderStyle}
  ${props =>
    props.icon &&
    (props.reverse
      ? `padding-right: ${props.theme.global.edgeSize.large};`
      : `padding-left: ${props.theme.global.edgeSize.large};`)}

  &::-moz-focus-inner {
    border: none;
    outline: none;
  }

  ${props => props.focus && !props.plain && focusStyle()};
  ${props =>
    props.disabled &&
    disabledStyle(
      props.theme.textInput.disabled && props.theme.textInput.disabled.opacity,
    )}
  ${props => props.theme.textInput && props.theme.textInput.extend};
`;

StyledTextInput.defaultProps = {};
Object.setPrototypeOf(StyledTextInput.defaultProps, defaultProps);

const StyledTextInputContainer = styled.div`
  position: relative;
  width: 100%;

  ${props =>
    props.theme.textInput &&
    props.theme.textInput.container &&
    props.theme.textInput.container.extend};
`;

StyledTextInputContainer.defaultProps = {};
Object.setPrototypeOf(StyledTextInputContainer.defaultProps, defaultProps);

const StyledPlaceholder = styled.div`
  position: absolute;
  left: ${props =>
    parseMetricToNum(getInputPadBySide(props, 'left')) -
    parseMetricToNum(props.theme.global.control.border.width)}px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  justify-content: center;
  pointer-events: none;

  ${props =>
    props.theme.textInput &&
    props.theme.textInput.placeholder &&
    props.theme.textInput.placeholder.extend};
`;

StyledPlaceholder.defaultProps = {};
Object.setPrototypeOf(StyledPlaceholder.defaultProps, defaultProps);

const StyledIcon = styled.div`
  position: absolute;
  display: flex;
  justify: center;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  ${props =>
    props.reverse
      ? `right: ${getInputPadBySide(props, 'right')};`
      : `left: ${getInputPadBySide(props, 'left')};`}
`;

const StyledSuggestions = styled.ol`
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  margin: 0;
  padding: 0;
  list-style-type: none;

  ${props =>
    props.theme.textInput &&
    props.theme.textInput.suggestions &&
    props.theme.textInput.suggestions.extend};
`;

StyledSuggestions.defaultProps = {};
Object.setPrototypeOf(StyledSuggestions.defaultProps, defaultProps);

export {
  StyledTextInput,
  StyledTextInputContainer,
  StyledPlaceholder,
  StyledIcon,
  StyledSuggestions,
};
