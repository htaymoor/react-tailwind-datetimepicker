import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DateTimePicker } from '../components/DateTimePicker';

describe('DateTimePicker', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders DatePicker and TimePicker', () => {
    const testDate = new Date(2023, 5, 15, 14, 30);
    render(
      <DateTimePicker
        value={testDate}
        onChange={mockOnChange}
        timeFormat="24"
      />
    );

    expect(screen.getByText('June 2023')).toBeInTheDocument();
    expect(screen.getByDisplayValue('14')).toBeInTheDocument();
    expect(screen.getByDisplayValue('30')).toBeInTheDocument();
  });

  test('calls onChange when date is selected', () => {
    const testDate = new Date(2023, 5, 15, 14, 30);
    render(
      <DateTimePicker
        value={testDate}
        onChange={mockOnChange}
        timeFormat="24"
      />
    );

    const dayButton = screen.getByText('20');
    fireEvent.click(dayButton);

    expect(mockOnChange).toHaveBeenCalledWith(
      new Date(2023, 5, 20, 14, 30)
    );
  });

  test('calls onChange when time is changed', () => {
    const testDate = new Date(2023, 5, 15, 14, 30);
    render(
      <DateTimePicker
        value={testDate}
        onChange={mockOnChange}
        timeFormat="24"
      />
    );

    const hourSelect = screen.getByLabelText('Hour');
    fireEvent.change(hourSelect, { target: { value: '16' } });

    expect(mockOnChange).toHaveBeenCalledWith(
      new Date(2023, 5, 15, 16, 30)
    );
  });
});