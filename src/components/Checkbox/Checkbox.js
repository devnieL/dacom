import React, { Component } from 'react';
// import uuidv1 from 'uuid/v1';
import PropTypes from 'prop-types';
import { Checkbox as CheckboxCarbon, Icon } from '@devniel/carbon-components-react';
import classNames from 'classnames';

import './Checkbox.scss';

/**
 * Checkbox component based on the Carbon Checkbox. It requires to have
 * the `carbon-components` styles installed.
 */
export default class Checkbox extends Component {
  state = {
    value: null,
  };

  constructor(props) {
    super(props);
    const { value } = props;
    this.state = {
      value,
    };
  }

  get value() {
    const { value } = this.state;
    return value;
  }

  onChange = value => {
    const { onChange } = this.props;
    this.setState({
      value,
    });

    if (onChange) onChange(value);
  };

  render() {
    const { label, className, editable, id, disabled } = this.props;
    const { value } = this.state;

    const finalClassName = classNames('da__Checkbox', className);

    return (
      <div className={finalClassName} data-editable={editable !== false}>
        {editable === false ? (
          <div className="da__Checkbox__wrapper">
            <Icon
              name="icon--checkmark"
              description="Included"
              className="da__Checkbox__value-icon"
            />
            <span className="da__Checkbox__label">{label}</span>
          </div>
        ) : (
          <CheckboxCarbon
            defaultChecked={value}
            labelText={label}
            hideLabel={label === undefined}
            disabled={disabled}
            wrapperClassName="da__Checkbox__wrapper"
            id={id}
            onChange={v => this.onChange(v)}
          />
        )}
      </div>
    );
  }
}

Checkbox.defaultProps = {
  value: null,
  onChange: null,
  label: null,
  className: null,
  editable: null,
  disabled: null,
};

Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
  editable: PropTypes.bool,
  disabled: PropTypes.bool,
};
