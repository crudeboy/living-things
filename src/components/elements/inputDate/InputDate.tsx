import './inputDate.scss';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { dateToString, dateYearToNumber, stringOrNumberToDate } from '../../../utils/dateUtils';

const InputDate = (props: {
  type: 'date' | 'year'
  label?: string;
  placeholder?: string;
  name?: string;
  required?: boolean;
  value: string | number | undefined;
  onChange?: (value: string | number) => void;
}) => {

  const handleDateChange = (date: Date | null) => {
    console.log('handleDateChange', props.value);
    if (date && props.onChange && props.type === 'year') {
      const dateAsNumber = dateYearToNumber(date)
      if (dateAsNumber) props.onChange(dateAsNumber);
    } else if (date && props.onChange && props.type === 'date') {
      const dateAsString = dateToString(date)
      if (dateAsString) props.onChange(dateAsString);
    }
  };

  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(stringOrNumberToDate(props.value))
  }, [props.value])

  if (props.type === 'year') {
      return (
          <div className="input-field">
            {props.label && (
                <label className="label">
                  {props.label && <span>{props.label}</span>}
                  {props.required && <span> *</span>}
                </label>
            )}
            <DatePicker
                placeholderText={props.placeholder}
                selected={date}
                name={props.name}
                onChange={(date) => handleDateChange(date)}
                showYearPicker
                required={props.required}
                dateFormat="yyyy"
            />
          </div>
      );
    } else {
      return (
          <div className="input-field">
            <DatePicker
                placeholderText={props.placeholder}
                selected={date}
                name={props.name}
                onChange={(date) => handleDateChange(date)}
                required={props.required}
                dateFormat="dd.MM.yyyy"
            />
          </div>
      );
  }

};

export default InputDate;
