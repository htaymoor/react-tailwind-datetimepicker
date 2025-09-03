import React from 'react';
import { DateTimePicker } from '../components/DateTimePicker.jsx';

describe('DateTimePicker TSX', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  test('renders with TypeScript support', () => {
    const testDate = new Date(2023, 5, 15, 14, 30);
    const component = <DateTimePicker
      value={testDate}
      onChange={mockOnChange}
      timeFormat="24"
    />;

    expect(component).toBeDefined();
    expect(component.props.value).toEqual(testDate);
    expect(component.props.timeFormat).toBe('24');
  });

  test('accepts TypeScript props', () => {
    const testDate = new Date(2023, 5, 15, 14, 30);
    const component = <DateTimePicker
      value={testDate}
      onChange={mockOnChange}
      timeFormat="12"
      size="lg"
      theme="dark"
      containerClassName="custom-class"
    />;

    expect(component.props.size).toBe('lg');
    expect(component.props.theme).toBe('dark');
    expect(component.props.containerClassName).toBe('custom-class');
  });
});