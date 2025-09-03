import React, { useState, useEffect } from 'react';

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

const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  minDate,
  maxDate,
  disabled = false,
  className = '',
  containerClassName = '',
  headerClassName = '',
  navButtonClassName = '',
  dayButtonClassName = '',
  selectedDayClassName = '',
  todayClassName = '',
  disabledDayClassName = '',
  dayNameClassName = '',
  size = 'md',
  theme = 'light',
}) => {
  const [currentMonth, setCurrentMonth] = useState(value.getMonth());
  const [currentYear, setCurrentYear] = useState(value.getFullYear());

  useEffect(() => {
    setCurrentMonth(value.getMonth());
    setCurrentYear(value.getFullYear());
  }, [value]);

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const isDateDisabled = (day: number | null): boolean => {
    if (!day) return true;
    const date = new Date(currentYear, currentMonth, day);
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    return false;
  };

  const isSelected = (day: number | null): boolean => {
    if (!day) return false;
    return (
      value.getDate() === day &&
      value.getMonth() === currentMonth &&
      value.getFullYear() === currentYear
    );
  };

  const isToday = (day: number | null): boolean => {
    if (!day) return false;
    const today = new Date();
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const handleDateClick = (day: number | null) => {
    if (!day || disabled || isDateDisabled(day)) return;
    const newDate = new Date(currentYear, currentMonth, day);
    onChange(newDate);
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Size-based classes
  const sizeClasses = {
    sm: {
      container: 'p-2 text-sm',
      header: 'text-sm mb-2',
      navButton: 'px-2 py-1 text-sm',
      dayButton: 'py-1 px-2 text-xs',
      dayName: 'text-xs py-1'
    },
    md: {
      container: 'p-4 text-base',
      header: 'text-lg mb-4',
      navButton: 'px-3 py-1',
      dayButton: 'py-2 px-3',
      dayName: 'text-sm py-2'
    },
    lg: {
      container: 'p-6 text-lg',
      header: 'text-xl mb-6',
      navButton: 'px-4 py-2 text-lg',
      dayButton: 'py-3 px-4 text-lg',
      dayName: 'text-base py-3'
    }
  };

  // Theme-based classes
  const themeClasses = {
    light: {
      container: 'bg-white border-gray-300',
      header: 'text-gray-800',
      navButton: 'text-gray-600 hover:text-gray-800 hover:bg-gray-100',
      dayButton: 'text-gray-700 hover:bg-blue-50',
      selectedDay: 'bg-blue-500 text-white',
      today: 'bg-blue-100 text-blue-800',
      disabledDay: 'text-gray-400',
      dayName: 'text-gray-500'
    },
    dark: {
      container: 'bg-gray-800 border-gray-600',
      header: 'text-gray-100',
      navButton: 'text-gray-400 hover:text-gray-200 hover:bg-gray-700',
      dayButton: 'text-gray-300 hover:bg-gray-700',
      selectedDay: 'bg-blue-600 text-white',
      today: 'bg-blue-900 text-blue-200',
      disabledDay: 'text-gray-600',
      dayName: 'text-gray-400'
    },
    custom: {
      container: '',
      header: '',
      navButton: '',
      dayButton: '',
      selectedDay: '',
      today: '',
      disabledDay: '',
      dayName: ''
    }
  };

  // Helper functions to get combined classes
  const getContainerClass = () => {
    const base = theme === 'custom' ? '' : 'border rounded-lg shadow-lg';
    const themeClass = themeClasses[theme].container;
    return `${base} ${themeClass} ${sizeClasses[size].container} ${containerClassName}`.trim();
  };

  const getHeaderClass = () => {
    const themeClass = themeClasses[theme].header;
    return `${themeClass} ${sizeClasses[size].header} ${headerClassName}`.trim();
  };

  const getNavButtonClass = () => {
    const base = 'rounded disabled:opacity-50 transition-colors';
    const themeClass = themeClasses[theme].navButton;
    return `${base} ${themeClass} ${sizeClasses[size].navButton} ${navButtonClassName}`.trim();
  };

  const getDayButtonClass = (isSelected: boolean, isToday: boolean, isDisabled: boolean) => {
    const base = 'text-center rounded transition-colors disabled:cursor-not-allowed';
    let themeClass = themeClasses[theme].dayButton;

    if (isSelected && theme !== 'custom') {
      themeClass = themeClasses[theme].selectedDay;
    } else if (isToday && !isSelected && theme !== 'custom') {
      themeClass = themeClasses[theme].today;
    } else if (isDisabled && theme !== 'custom') {
      themeClass = themeClasses[theme].disabledDay;
    }

    const customClass = isSelected ? selectedDayClassName :
                       isToday ? todayClassName :
                       isDisabled ? disabledDayClassName : dayButtonClassName;

    return `${base} ${themeClass} ${sizeClasses[size].dayButton} ${customClass || ''}`.trim();
  };

  const getDayNameClass = () => {
    const themeClass = themeClasses[theme].dayName;
    return `${themeClass} ${sizeClasses[size].dayName} ${dayNameClassName}`.trim();
  };


  return (
    <div className={`${getContainerClass()} ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={disabled}
          className={getNavButtonClass()}
          aria-label="Previous month"
        >
          {'<'}
        </button>
        <h2 className={`font-semibold ${getHeaderClass()}`}>
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <button
          onClick={handleNextMonth}
          disabled={disabled}
          className={getNavButtonClass()}
          aria-label="Next month"
        >
          {'>'}
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Calendar">
        {dayNames.map((day) => (
          <div key={day} className={`text-center font-medium ${getDayNameClass()}`} role="columnheader">
            {day}
          </div>
        ))}
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDateClick(day)}
            disabled={disabled || isDateDisabled(day)}
            className={getDayButtonClass(isSelected(day), isToday(day), isDateDisabled(day))}
            role="gridcell"
            aria-selected={isSelected(day)}
            aria-disabled={isDateDisabled(day)}
          >
            {day || ''}
          </button>
        ))}
      </div>
    </div>
  );
};

export { DatePicker };