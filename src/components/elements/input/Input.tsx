import './input.scss';
import React, { FocusEventHandler } from 'react';

const Input = (props: {
  type: 'text' | 'select' | 'number' | 'textarea';
  placeholder?: string;
  required?: boolean;
  name?: string;
  options?: Array<string>;
  multiselect?: boolean;
  value: string | number | undefined;
  min?: number;
  max?: number;
  onChange?: (value: string | number) => void;
  className?: string;
  onBlur?: FocusEventHandler;
  capitalize?: boolean;
}) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLDataElement>) => {
    if (props.onChange) {
      props.onChange(e.target.value);
    }
  };

  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const getDynamicInput = () => {
    switch (props.type) {
      case 'text':
        return (
            <input
                autoComplete="off"
                value={props.value}
                onChange={handleChange}
                onBlur={props.onBlur}
                name={props.name}
                className={'input'}
                type="text"
                required={props.required}
                placeholder={props.placeholder}
            />
        );

      case 'number':
        return (
            <input
                autoComplete="off"
                value={props.value}
                onChange={handleChange}
                name={props.name}
                className={'input'}
                min={props.min}
                max={props.max}
                type="number"
                required={props.required}
                placeholder={props.placeholder}
            />
        );

      case 'select':
        return (
            <div className={'select ' + (props.multiselect ? 'is-multiple' : '')}>
            <select required={props.required} name={props.name} onChange={handleChange} value={props.value} multiple={!!props.multiselect}>
                <option value="" disabled>{props.placeholder ? props.placeholder : 'Please choose'}</option>
                {props.options && props.options.map((element, index) => (
                    <option
                        value={element}
                        key={index}
                    >{props.capitalize ? capitalizeFirstLetter(element) : element}</option>
                ))}
              </select>
            </div>
        );

      case 'textarea':
        return (
            <textarea
                autoComplete="off"
                value={props.value}
                onChange={handleChange}
                name={props.name}
                className={'textarea'}
                required={props.required}
                placeholder={props.placeholder}
            />
        );


      default:
        return (<></>);
    }
  };

  return (
    <div className={'input-field' + (props.className ? ` ${props.className}` : '')}>
        <div className="control">
          {getDynamicInput()}
        </div>
      </div>
  );
};

export default Input;
