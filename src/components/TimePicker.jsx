import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TimePicker = ({
  value,
  onChange,
  timeFormat,
  disabled = false,
  className = '',
  // Customization props
  containerClassName = '',
  selectClassName = '',
  separatorClassName = '',
  size = 'md',
  theme = 'light',
}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [ampm, setAmpm] = useState('AM');

  useEffect(() => {
    let h = value.getHours();
    let m = value.getMinutes();
    if (timeFormat === '12') {
      setAmpm(h >= 12 ? 'PM' : 'AM');
      h = h % 12 || 12;
    }
    setHour(h);
    setMinute(m);
  }, [value, timeFormat]);

  const handleHourChange = (e) => {
    const newHour = parseInt(e.target.value);
    setHour(newHour);
    updateTime(newHour, minute, ampm);
  };

  const handleMinuteChange = (e) => {
    const newMinute = parseInt(e.target.value);
    setMinute(newMinute);
    updateTime(hour, newMinute, ampm);
  };

  const handleAmpmChange = (e) => {
    const newAmpm = e.target.value;
    setAmpm(newAmpm);
    updateTime(hour, minute, newAmpm);
  };

  const updateTime = (h, m, ap) => {
    let newHour = h;
    if (timeFormat === '12') {
      if (ap === 'PM' && h !== 12) newHour += 12;
      if (ap === 'AM' && h === 12) newHour = 0;
    }
    const newDate = new Date(value);
    newDate.setHours(newHour, m);
    onChange(newDate);
  };

  const hourOptions = [];
  const maxHour = timeFormat === '24' ? 23 : 12;
  const minHour = timeFormat === '24' ? 0 : 1;
  for (let i = minHour; i <= maxHour; i++) {
    hourOptions.push(
      <option key={i} value={i}>
        {i.toString().padStart(2, '0')}
      </option>
    );
  }

  const minuteOptions = [];
  for (let i = 0; i < 60; i++) {
    minuteOptions.push(
      <option key={i} value={i}>
        {i.toString().padStart(2, '0')}
      </option>
    );
  }

  // Size-based classes
  const sizeClasses = {
    sm: {
      container: 'space-x-1',
      select: 'px-1 py-0.5 text-xs',
      separator: 'text-xs'
    },
    md: {
      container: 'space-x-2',
      select: 'px-2 py-1',
      separator: 'text-sm'
    },
    lg: {
      container: 'space-x-3',
      select: 'px-3 py-2 text-lg',
      separator: 'text-lg'
    }
  };

  // Theme-based classes
  const themeClasses = {
    light: {
      select: 'border border-gray-300 rounded bg-white text-gray-700 disabled:opacity-50'
    },
    dark: {
      select: 'border border-gray-600 rounded bg-gray-800 text-gray-300 disabled:opacity-50'
    },
    custom: {
      select: ''
    }
  };

  // Helper functions to get combined classes
  const getContainerClass = () => {
    const base = 'flex items-center';
    return `${base} ${sizeClasses[size].container} ${containerClassName}`.trim();
  };

  const getSelectClass = () => {
    const base = 'rounded disabled:cursor-not-allowed transition-colors';
    const themeClass = themeClasses[theme].select;
    return `${base} ${themeClass} ${sizeClasses[size].select} ${selectClassName}`.trim();
  };

  const getSeparatorClass = () => {
    const base = 'text-gray-500';
    return `${base} ${sizeClasses[size].separator} ${separatorClassName}`.trim();
  };

  return (
    <div className={`${getContainerClass()} ${className}`}>
      <select
        value={hour}
        onChange={handleHourChange}
        disabled={disabled}
        className={getSelectClass()}
        aria-label="Hour"
      >
        {hourOptions}
      </select>
      <span className={getSeparatorClass()}>:</span>
      <select
        value={minute}
        onChange={handleMinuteChange}
        disabled={disabled}
        className={getSelectClass()}
        aria-label="Minute"
      >
        {minuteOptions}
      </select>
      {timeFormat === '12' && (
        <>
          <select
            value={ampm}
            onChange={handleAmpmChange}
            disabled={disabled}
            className={getSelectClass()}
            aria-label="AM/PM"
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </>
      )}
    </div>
  );
};

TimePicker.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
  timeFormat: PropTypes.oneOf(['12', '24']).isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  selectClassName: PropTypes.string,
  separatorClassName: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  theme: PropTypes.oneOf(['light', 'dark', 'custom']),
};

export { TimePicker };