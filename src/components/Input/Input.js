import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import validator from 'validator';
import { Icon } from '@devniel/carbon-components-react';

import './Input.scss';

/**
 * Input component to accept string values with support
 * for types such as **number** and **text** just like the `<input>` element.
 */
export default class Input extends Component {

  static defaultProps = {
    id: null,
    name: null,
    className: null,
    label: null,
    labelPosition: null,
    value: null,
    type: 'text',
    inputStyles: {
      fontSize: '28px'
    },
    labelStyles: {
      fontSize: '12px'
    },
    otherStyles: {
      lineColor: {
        onFocus: '#0F6FFF',
        onBlur: '#DCDCDC'
      }
    },
    focus: false,
    onChange: null,
    onValidation: null,
    unit: null,
    prefix: null,
    placeholder: null,
    // Flag to set if the input should validate its values and show error messages
    validate: false,
    // Only for Input of type `number`, the minimun allowed value
    min: null,
    // Only for Input of type `number`, the maximun allowed value
    max: null
  };

  static propTypes = {
    id: PropTypes.string,
    name: PropTypes.string,
    className: PropTypes.string,
    focus: PropTypes.bool,
    label: PropTypes.string,
    labelPosition: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string,
    prefix: PropTypes.string,
    placeholder: PropTypes.string,
    unit: PropTypes.string,
    validate: PropTypes.bool,
    onChange: PropTypes.func,
    onValidation: PropTypes.func,
    min: PropTypes.number,
    max: PropTypes.number,
    inputStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    labelStyles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
    otherStyles: PropTypes.object // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.state = {
      value: props.value,
      id: props.id
    }
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
    const { focus } = this.props;
    const { value } = this.state;

    if (focus) {
      if (this.inputRef && this.inputRef.current) this.inputRef.current.focus();
    }

    this.validate(value, true);
  }

  get value() {
    const { value } = this.state;
    return value;
  }

  set value(value) {
    this.setState({
      value,
    });
  }

  focus = () => {
    if (this.inputRef && this.inputRef.current) this.inputRef.current.focus();
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

  validate = (value, updateState = false) => {
    const { type, validate, min, max, onValidation } = this.props;

    if (!validate)
      return {
        valid: true,
        status: null
      };

    if (value == null)
      return {
        valid: true,
        status: null
      };

    const valueAsString = typeof value !== 'string' ? value.toString() : value;

    // The `value` property defines if an Input is valid or not
    let valid = true;

    // The `status` is defined as the string representation of the Input state, it could be in `error` or `warning`
    // and is described by a `message`.
    let status;

    // If there is no value then there is no validation.
    if (validator.isEmpty(valueAsString)) {
      return {
        valid: true,
        status: null,
      };
    }

    // Validate inputs based on its type.
    switch (type) {
      case 'number':
        valid = validator.matches(valueAsString, /^[+-]?([0-9]*[.,])?[0-9]+([%])?$/, 'ig');

        if (!valid) {
          status = {
            element: (
              <React.Fragment>
                <p className="da__Input__p">
                  The baseline value provided is not valid,
                  <br />
                  please enter a numeric value.
                </p>
                <p className="da__Input__p" style={{ marginTop: '5px' }}>
                  <strong>
                    &lt;Minimum value: {min}
                    &gt;
                  </strong>
                </p>
              </React.Fragment>
            ),
            message: `The baseline value provided is not valid,\nplease enter a numeric value.\n<strong>&lt;Minimum value: ${min}&gt;</strong>`,
            type: 'error',
          };
        } else {
          // Converting values to parse signs like '%', ',', '.', '+' and '-'
          const valueAsNumber = parseFloat(valueAsString);

          if (valueAsNumber > 0 && min && valueAsNumber < min) {
            valid = false;
            status = {
              element: (
                <React.Fragment>
                  <p className="da__Input__p">
                    The baseline value provided is below the minimum,
                    <br />
                    needed by Decision Advisor, please enter a new value.
                  </p>
                  <p className="da__Input__p" style={{ marginTop: '5px' }}>
                    <strong>
                      &lt;Minimum value: {min}
                      &gt;
                    </strong>
                  </p>
                </React.Fragment>
              ),
              message: `The baseline value provided is below the minimum\nneeded by Decision Advisor, please enter a new value.\n<strong>&lt;Minimum value: ${min}&gt;</strong>`,
              type: 'error',
            };
          } else if (max && valueAsNumber > max) {
            valid = true;
            status = {
              element: (
                <React.Fragment>
                  <p className="da__Input__p">
                    The baseline value provided is above the maximum value supported;
                    <br />
                    pricing projections will be extrapolated from market data.
                  </p>
                  <p className="da__Input__p" style={{ marginTop: '5px' }}>
                    <strong>
                      &lt;Maximum value supported: {max}
                      &gt;
                    </strong>
                  </p>
                </React.Fragment>
              ),
              message: `The baseline value provided is above the maximum value supported;\npricing projections will be extrapolated from market data.\n<strong>&lt;Maximum value supported: ${max}&gt;</strong>`,
              type: 'warning',
            };
          } else {
            valid = true;
            status = null;
          }
        }
        break;
      case 'text':
        valid = true;
        break;
      default:
    }

    if (updateState)
      this.setState({
        valid,
        status,
      });

    if (onValidation) onValidation(valid);

    return { valid, status };
  };

  onInput = e => {
    // Validate input, {valid, error} are returned
    const validation = this.validate(e.target.value);

    this.setState(
      {
        value: e.target.value,
        ...validation,
      },
      () => {
        const { value } = this.state;
        this.onChange(value, validation.valid, this);
      },
    );
  };

  onChange = (value, valid) => {
    const { onChange } = this.props;
    if (onChange) onChange(value, valid, this);
  };

  render() {
    const { id, value, focused, status, valid } = this.state;

    const {
      name,
      className,
      label,
      inputStyles,
      labelStyles,
      otherStyles,
      labelPosition,
      prefix,
      placeholder,
      type,
    } = this.props;

    const finalClasName = classnames(`da__Input`, className);

    let input = (
      <input
        className='da__Input__input'
        name={name}
        id={id}
        type="text"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        value={value || ''}
        ref={this.inputRef}
        onChange={this.onInput}
        placeholder={placeholder}
      />
    );

    let component = null;

    const lineColor = {
      onFocus: {
        borderColor: otherStyles.lineColor.onFocus,
      },
      onBlur: {
        borderColor: otherStyles.lineColor.onBlur,
      },
    };

    switch (type) {
      case 'number':
        {
          const { unit } = this.props;
          const placeholder_for_number = placeholder != null ? placeholder : '000M';
          const prefix_for_numbers = prefix || unit;

          input = (
            <input
              className='da__Input__input'
              id={id}
              type="text"
              value={value == null ? '' : value}
              onChange={this.onInput}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              ref={this.inputRef}
              placeholder={placeholder_for_number}
            />
          );

          component = (
            <div
              className={`da__Input ${className || ''}`}
              data-type="number"
              data-focused={focused}
              data-valid={valid}
              data-status={status ? status.type : 'default'}
            >
              <div className={`da__Input__inner da__Input__label-${labelPosition || 'top'}`}>
                {/* Input label, it could be it above or below the input */}
                {label && (
                  <label htmlFor={id} style={labelStyles} className="da__Input__Input-Label">
                    {label}
                  </label>
                )}

                {/* The main part of the components, the input control */}
                <div
                  className="da__Input__Input-Control"
                  style={
                    !focused
                      ? { ...inputStyles, ...lineColor.onBlur }
                      : { ...inputStyles, ...lineColor.onFocus }
                  }
                >
                  {/* the prefix of the input element */}
                  {prefix_for_numbers && (
                    <div className="da__Input__Input-Control-Prefix">{prefix_for_numbers}</div>
                  )}

                  {/* input element */}
                  {input}

                  {/* The status message describing the state of the component */}
                  {status && (
                    <div className="da__Input__Input-Status">
                      <Icon
                        name={
                          status.type === 'error' ? 'icon--error--outline' : 'icon--info--outline'
                        }
                        fill="#FFF"
                        className="icon"
                        description=""
                      />
                      <div className="da__Input__Input-Status-Message">{status.element}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        }
        break;

      case 'text':
      default: {
        const placeholder_for_text = placeholder != null ? placeholder : 'Undefined';

        input = (
          <input
            className='da__Input__input'
            id={id}
            type="text"
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            value={value || ''}
            ref={this.inputRef}
            onChange={this.onInput}
            placeholder={placeholder_for_text}
          />
        );

        component = (
          <div
            className={finalClasName}
            data-type="text"
            data-with-prefix={prefix !== null}
            data-focused={focused}
          >
            <div className={`da__Input__inner da__Input__label-${labelPosition || 'top'}`}>
              {label && (
                <label htmlFor={id} style={labelStyles} className="da__Input__Input-Label">
                  {label}
                </label>
              )}
              <div
                style={
                  !focused
                    ? { ...inputStyles, ...lineColor.onBlur }
                    : { ...inputStyles, ...lineColor.onFocus }
                }
                className="da__Input__Input-Control"
                data-prefix={prefix}
              >
                {prefix !== null && (
                  <div className="da__Input__Input-Control-Prefix">{prefix}</div>
                )}

                {input}
              </div>
            </div>
          </div>
        );
      }
    }

    return component;
  }
}
