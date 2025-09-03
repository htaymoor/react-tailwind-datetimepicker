// TypeScript declarations for JSX components
export interface DatePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  minDate?: Date;
  maxDate?: Date;
  disabled?: boolean;
  className?: string;
  // Customization props
  containerClassName?: string;
  headerClassName?: string;
  navButtonClassName?: string;
  dayButtonClassName?: string;
  selectedDayClassName?: string;
  todayClassName?: string;
  disabledDayClassName?: string;
  dayNameClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'custom';
}

export interface TimePickerProps {
  value: Date;
  onChange: (date: Date) => void;
  timeFormat: '12' | '24';
  disabled?: boolean;
  className?: string;
  // Customization props
  containerClassName?: string;
  selectClassName?: string;
  separatorClassName?: string;
  size?: 'sm' | 'md' | 'lg';
  theme?: 'light' | 'dark' | 'custom';
}

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

export declare const DatePicker: React.ComponentType<DatePickerProps>;
export declare const TimePicker: React.ComponentType<TimePickerProps>;
export declare const DateTimePicker: React.ComponentType<DateTimePickerProps>;