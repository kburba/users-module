import React, { useState } from 'react';
import { DateRangePicker, FocusedInputShape } from 'react-dates';
import moment, { Moment } from 'moment';

export default function DatePicker({ onDateChange }) {
  const [focusedInput, setFocusedInput] = useState<FocusedInputShape | null>(
    null
  );
  const [start, setStartDate] = useState<Moment | null>(
    moment().startOf('month')
  );
  const [end, setEndDate] = useState<Moment | null>(moment());

  function handleDateChange({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) {
    setStartDate(startDate);
    setEndDate(endDate);
    if (startDate && endDate && focusedInput === 'endDate') {
      onDateChange(startDate, endDate);
    }
  }

  function handleFocusChange(newFocus) {
    setFocusedInput(newFocus);
  }

  return (
    <DateRangePicker
      isOutsideRange={() => false}
      startDate={start}
      startDateId="startdateid"
      endDate={end}
      endDateId="enddateid"
      onDatesChange={handleDateChange}
      focusedInput={focusedInput}
      onFocusChange={handleFocusChange}
    />
  );
}
