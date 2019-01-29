import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import TextareaAutosize from 'react-textarea-autosize';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './Textarea.scss';
import CustomScroll from 'react-custom-scroll';

const TAG = 'Textarea';

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

  componentDidUpdate(prevProps) {
    const { value } = this.props;

    // Log.info(TAG, "Textarea.componentDidUpdate() | value :", value, "| prevProps.value: ", prevProps.value);

    if (value !== prevProps.value) {
      /* eslint-disable react/no-did-update-set-state */
      this.setState({
        value,
      });
      /* eslint-enable react/no-did-update-set-state */
    }
  }

  onInput = e => {
    const { autoHeight, visibleLines, height } = this.props;
    const { textareaWrapperHeight, baseHeight } = this.state;

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

    const { id, isScrollbar, value, focused, textareaWrapperWidth, textareaWrapperHeight } = this.state;

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
      style={inputStyles}
      tabIndex={tabIndex}
      placeholder={placeholder}
      autoFocus={autofocus}
      maxLength={maxLength}
      onChange={this.onInput} />

    component = (
      <div className={finalClasName} style={style} data-with-prefix={prefix !== null}>

        {label && (
          <label htmlFor={id} className="da__Textarea__textarea-label">
            {label}
          </label>
        )}

        <div className='da__Textarea__textarea-wrapper2' data-prefix={prefix}>

          {/* the prefix of the input element */}
          {prefix && (
            <div className="da__Textarea__textarea-prefix" >
              <span style={inputStyles}>{prefix}</span>
            </div>
          )}

          <Scrollbars onClick={this.focus} className="da__Textarea__textarea-wrapper" style={
            !focused
              ? {...lineColor.onBlur}
              : {...lineColor.onFocus}
          } data-with-line={withLine} >
            {textarea}
          </Scrollbars>
        </div>

      </div>
    );

    return component;

  }

}

export default Textarea;
