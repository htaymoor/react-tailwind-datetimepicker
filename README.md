# React Tailwind DateTimePicker

A lightweight, secure date-time picker component for React applications using TailwindCSS.

## Features

- Combined date and time selection
- Support for 12-hour and 24-hour time formats
- Accessibility features (ARIA labels, keyboard navigation)
- Customizable styling with TailwindCSS
- No external dependencies (except React and TailwindCSS)
- TypeScript support

## Installation

```bash
npm install react-tailwind-datetimepicker
```

## Usage

### Basic Usage

```tsx
import { DateTimePicker } from 'react-tailwind-datetimepicker';

function App() {
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <DateTimePicker
      value={dateTime}
      onChange={setDateTime}
      timeFormat="24"
    />
  );
}
```

### With Date Range

```tsx
<DateTimePicker
  value={dateTime}
  onChange={setDateTime}
  minDate={new Date(2023, 0, 1)}
  maxDate={new Date(2023, 11, 31)}
  timeFormat="12"
/>
```

### Separate Components

```tsx
import { DatePicker, TimePicker } from 'react-tailwind-datetimepicker';

function MyComponent() {
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  return (
    <div>
      <DatePicker value={date} onChange={setDate} />
      <TimePicker value={time} onChange={setTime} timeFormat="24" />
    </div>
  );
}
```

### Customization Examples

#### Dark Theme with Custom Styling

```tsx
<DateTimePicker
  value={dateTime}
  onChange={setDateTime}
  theme="dark"
  size="lg"
  containerClassName="bg-gray-900 p-6 rounded-xl"
  datePickerProps={{
    selectedDayClassName="bg-purple-600 text-white",
    todayClassName="bg-purple-200 text-purple-800"
  }}
  timePickerProps={{
    selectClassName="bg-gray-800 border-gray-600 text-white"
  }}
/>
```

#### Compact Size with Brand Colors

```tsx
<DateTimePicker
  value={dateTime}
  onChange={setDateTime}
  size="sm"
  theme="custom"
  datePickerProps={{
    containerClassName: "bg-blue-50 border-blue-200",
    selectedDayClassName: "bg-blue-600 text-white hover:bg-blue-700",
    navButtonClassName: "text-blue-600 hover:bg-blue-100"
  }}
  timePickerProps={{
    selectClassName: "border-blue-300 bg-white text-blue-900",
    separatorClassName: "text-blue-500"
  }}
/>
```

#### Individual Component Customization

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  size="lg"
  theme="light"
  containerClassName="shadow-2xl border-2"
  headerClassName="text-xl font-bold text-indigo-600"
  selectedDayClassName="bg-indigo-600 text-white transform scale-110"
  dayButtonClassName="hover:bg-indigo-100 rounded-full"
/>

<TimePicker
  value={time}
  onChange={setTime}
  timeFormat="12"
  size="md"
  theme="custom"
  containerClassName="bg-gradient-to-r from-purple-100 to-pink-100 p-3 rounded-lg"
  selectClassName="bg-white border-purple-300 text-purple-900 font-semibold"
  separatorClassName="text-purple-500 mx-1"
/>
```

## API

### DateTimePicker Props

- `value`: Date - The current selected date and time
- `onChange`: (date: Date) => void - Callback when date/time changes
- `timeFormat`: "12" | "24" - Time format (default: "24")
- `minDate`?: Date - Minimum selectable date
- `maxDate`?: Date - Maximum selectable date
- `disabled`?: boolean - Disable the picker
- `className`?: string - Additional CSS classes
- `size`?: "sm" | "md" | "lg" - Component size (default: "md")
- `theme`?: "light" | "dark" | "custom" - Color theme (default: "light")
- `containerClassName`?: string - Custom container styling
- `datePickerClassName`?: string - Custom DatePicker wrapper styling
- `timePickerClassName`?: string - Custom TimePicker wrapper styling
- `datePickerProps`?: object - Specific DatePicker customization props
- `timePickerProps`?: object - Specific TimePicker customization props

### DatePicker Customization Props

- `containerClassName`?: string - Container styling
- `headerClassName`?: string - Month/year header styling
- `navButtonClassName`?: string - Navigation button styling
- `dayButtonClassName`?: string - Regular day button styling
- `selectedDayClassName`?: string - Selected day styling
- `todayClassName`?: string - Today's date styling
- `disabledDayClassName`?: string - Disabled day styling
- `dayNameClassName`?: string - Day name (Sun, Mon, etc.) styling

### TimePicker Customization Props

- `containerClassName`?: string - Container styling
- `selectClassName`?: string - Select dropdown styling
- `separatorClassName`?: string - Colon separator styling

## License

MIT