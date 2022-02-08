import './selectAutocomplete.scss';
import React, { Dispatch, SetStateAction } from 'react';
import { TextField, Autocomplete } from '@mui/material';

const SelectAutocomplete = (props: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  name?: string;
  options: Array<string>
  value: string | undefined;
  onChange: Dispatch<SetStateAction<string | undefined>>;
}) => {

  return (
      <div className="input-field select-autocomplete">
        {props.label && (
            <label className="label">
              {props.label && <span>{props.label}</span>}
              {props.required && <span> *</span>}
            </label>
        )}
        <Autocomplete
            id="checkboxes-tags"
            options={props.options}
            value={props.value}
            onChange={e => props.onChange((e.target as HTMLElement).innerText)}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => {
              return (
                  <li {...props} data-value={option} className="list">
                    {option}
                  </li>
              );
            }
            }
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} placeholder={props.placeholder} name={props.name} />
            )}
        />
      </div>
  );
};

export default SelectAutocomplete;
