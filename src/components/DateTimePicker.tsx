import React from 'react';
import { DatePicker, DatePickerProps } from './DatePicker';
import { TimePicker, TimePickerProps } from './TimePicker';

export interface DateTimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  timeFormat?: '12' | '24';
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  // Customization props
  containerClassName?: string;
  datePickerClassName?: string;
  timePickerClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'custom';
  // DatePicker specific customizations
  datePickerProps?: {
    containerClassName?: string;
    headerClassName?: string;
    navButtonClassName?: string;
    dayButtonClassName?: string;
    selectedDayClassName?: string;
    todayClassName?: string;
    disabledDayClassName?: string;
    dayNameClassName?: string;
  };
  // TimePicker specific customizations
  timePickerProps?: {
    containerClassName?: string;
    selectClassName?: string;
    separatorClassName?: string;
  };
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value,
  onChange,
  timeFormat = '24',
  minDate,
  maxDate,
  disabled = false,
  className = '',
  containerClassName = '',
  datePickerClassName = '',
  timePickerClassName = '',
  size = 'md',
  theme = 'light',
  datePickerProps = {},
  timePickerProps = {},
}) => {
  const handleDateChange = (newDate: Date) => {
    const updatedDate = new Date(value);
    updatedDate.setFullYear(newDate.getFullYear());
    updatedDate.setMonth(newDate.getMonth());
    updatedDate.setDate(newDate.getDate());
    onChange(updatedDate);
  };

  const handleTimeChange = (newDate: Date) => {
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

export { DateTimePicker };