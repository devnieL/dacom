import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Textarea.scss';
import CustomScroll from 'react-custom-scroll';

const TAG = 'Textarea';

/**
 * Textarea component with **auto height** support, custom scrollbar and
 * easy personalization.
 */
class Textarea extends Component {

  static defaultProps = {
    id: null,
    name: null,
    value: null,
    inputStyles: {
      color: '#FFF',
    },
    otherStyles: {
      lineColor: {
        onFocus: '#0F6FFF',
        onBlur: '#DCDCDC'
      }
    },
    labelStyles: {},
    thumbStyles: {},
    onSubmit: null,
    autofocus: false,
    autoHeight: false,
    visibleLines: 2,
    tabIndex: 0,
    maxLines: null,
    minLines: 2,
    maxLength: null,
    withLine: true
  };

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    multiline: PropTypes.bool,
    value: PropTypes.string,
    inputStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    labelStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    thumbStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    onSubmit: PropTypes.func,
    autofocus: PropTypes.bool,
    visibleLines: PropTypes.number,
    maxLines: PropTypes.number,
    minLines: PropTypes.number,
    maxLength: PropTypes.number,
    tabIndex: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      value: props.value,
      id: props.id
    };
  }

  static getDerivedStateFromProps(props, state) {
    const {value} = props;
    const stateUpdates = {};
    let newState;

    if(value !== state.defaultValue){
      stateUpdates.defaultValue = value;
      stateUpdates.value = value;
      newState = Object.assign({}, state, stateUpdates);
    }else{
      newState = Object.assign({}, state);
    }

    return newState;

  }

  componentDidMount() {

    console.log(this.bodyElement.clientHeight);

    this.setState({
      textareaBodyHeight: this.bodyElement.clientHeight
    })
  }

  onInput = e => {

    this.setState(
      {
        value: e.target.value
      }
    );

    this.onChange(e.target.value);
  };

  onKeyDown = e => {
    const { onSubmit } = this.props;
    const { value } = this.state;
    if (e.which === 13) {
      if (onSubmit) onSubmit(value);
    }
  };

  focus = () => {
    const { focused } = this.state;
    if (this.textarea && !focused) this.textarea.focus();
  };

  onFocus = () => {
    this.setState({
      focused: true
    });
  };

  onBlur = () => {
    this.setState({
      focused: false
    });
  };

  onChange = (value) => {
    const { onChange } = this.props;
    if (onChange) onChange(value);
  }

  get value() {
    const { value } = this.state;
    return value;
  }

  render() {

    const { id, value, focused, textareaBodyHeight } = this.state;

    const {
      className,
      label,
      inputStyles,
      labelStyles,
      thumbStyles,
      prefix,
      placeholder,
      autofocus,
      tabIndex,
      maxLines,
      minLines,
      maxLength,
      style,
      autoHeight,
      otherStyles,
      withLine
    } = this.props;

    const finalClasName = classnames(className, `da__Textarea`);

    const lineColor = {
      onFocus: {
        borderColor: otherStyles.lineColor.onFocus,
      },
      onBlur: {
        borderColor: otherStyles.lineColor.onBlur,
      },
    };

    let component = null;
    let textarea;

    textarea = <TextareaAutosize
      className="da__Textarea__textarea"
      id={id}
      onFocus={this.onFocus}
      onBlur={this.onBlur}
      inputRef={e => (this.textarea = e)}
      value={value || ''}
      tabIndex={tabIndex}
      placeholder={placeholder}
      autoFocus={autofocus}
      maxLength={maxLength}
      onChange={this.onInput} />

    let autoHeightMax = (() => {
      if(inputStyles.maxHeight){
        return parseInt(inputStyles.maxHeight);
      }
      if(style.height == 'auto'){
        return Number.MAX_VALUE;
      }
      if(textareaBodyHeight){
        return textareaBodyHeight;
      }
      return Number.MAX_VALUE;
    })();

    component = (
      <div className={finalClasName} style={style} data-with-prefix={prefix !== null}>

        {label && (
          <label htmlFor={id} className="da__Textarea__textarea-label">
            {label}
          </label>
        )}

        <div
          className='da__Textarea__textarea-body'
          style={
            !focused
              ? {...inputStyles, ...lineColor.onBlur}
              : {...inputStyles, ...lineColor.onFocus}
          }
          data-prefix={prefix}
          data-with-line={withLine}
          onClick={this.focus}
          ref={ (e) => this.bodyElement = e }>

          {/* the prefix of the input element */}
          {prefix && (
            <div className="da__Textarea__textarea-prefix" >
              <span style={inputStyles}>{prefix}</span>
            </div>
          )}

          {autoHeight ?
            <Scrollbars
              className="da__Textarea__textarea-wrapper-with-scrollbars"
              hideTracksWhenNotNeeded
              autoHide
              autoHeight
              autoHeightMin={parseInt(inputStyles.minHeight)}
              autoHeightMax={autoHeightMax}
              onClick={this.focus}>
              {textarea}
            </Scrollbars>
            :
            <Scrollbars
              className="da__Textarea__textarea-wrapper-with-scrollbars"
              autoHide
              onClick={this.focus}
              data-with-line={withLine} >
              {textarea}
            </Scrollbars>
          }

        </div>

      </div>
    );

    return component;

  }

}

export default Textarea;
