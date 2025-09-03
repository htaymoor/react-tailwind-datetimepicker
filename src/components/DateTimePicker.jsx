import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker } from './DatePicker.jsx';
import { TimePicker } from './TimePicker.jsx';

const DateTimePicker = ({
  value,
  onChange,
  timeFormat = '24',
  minDate,
  maxDate,
  disabled = false,
  className = '',
  // Customization props
  containerClassName = '',
  datePickerClassName = '',
  timePickerClassName = '',
  size = 'md',
  theme = 'light',
  // DatePicker specific customizations
  datePickerProps = {},
  // TimePicker specific customizations
  timePickerProps = {},
}) => {
  const handleDateChange = (newDate) => {
    const updatedDate = new Date(value);
    updatedDate.setFullYear(newDate.getFullYear());
    updatedDate.setMonth(newDate.getMonth());
    updatedDate.setDate(newDate.getDate());
    onChange(updatedDate);
  };

  const handleTimeChange = (newDate) => {
    const updatedDate = new Date(value);
    updatedDate.setHours(newDate.getHours());
    updatedDate.setMinutes(newDate.getMinutes());
    onChange(updatedDate);
  };

  return (
    <div className={`space-y-4 ${containerClassName} ${className}`}>
      <DatePicker
        value={value}
        onChange={handleDateChange}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={datePickerClassName}
        size={size}
        theme={theme}
        {...datePickerProps}
      />
      <div className="flex justify-center">
        <TimePicker
          value={value}
          onChange={handleTimeChange}
          timeFormat={timeFormat}
          disabled={disabled}
          className={timePickerClassName}
          size={size}
          theme={theme}
          {...timePickerProps}
        />
      </div>
    </div>
  );
};

DateTimePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  timeFormat: PropTypes.oneOf(['12', '24']),
  minDate: PropTypes.instanceOf(Date),
  maxDate: PropTypes.instanceOf(Date),
  disabled: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  datePickerClassName: PropTypes.string,
  timePickerClassName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  theme: PropTypes.oneOf(['light', 'dark', 'custom']),
  datePickerProps: PropTypes.object,
  timePickerProps: PropTypes.object,
};

export { DateTimePicker };