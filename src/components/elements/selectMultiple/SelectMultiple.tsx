import './selectMultiple.scss';
import Checkbox from '@mui/material/Checkbox';
import React, { Dispatch, SetStateAction, SyntheticEvent } from 'react';
import { TextField, Autocomplete } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SelectMultiple = (props: {
  label?: string;
  placeholder?: string;
  required?: boolean;
  options: Array<string>;
  name?: string;
  value: Array<string> | undefined;
  onChange: Dispatch<SetStateAction<Array<string> | undefined>>;
}) => {

  function removeItemOnce(arr: Array<string>, value: string) {
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }

  const handleChange = (event: SyntheticEvent<Element, Event>): void => {
    const target = event.target as HTMLElement;
    const item = target.classList.contains('checkboxes-list')
        ? target
        : target.closest('.checkboxes-list') as HTMLElement;
    const value = item.getAttribute('data-value') as string;
    const newSelected = props.value?.includes(value) ? removeItemOnce(props.value, value) : [...props.value!, value];
    props.onChange(newSelected);
  };

  return (
      <div className="input-field select-multiple">
        {props.label && (
            <label className="label">
              {props.label && <span>{props.label}</span>}
              {props.required && <span> *</span>}
            </label>
        )}
        <Autocomplete
            multiple
            id="checkboxes-tags"
            options={props.options}
            disableCloseOnSelect
            value={props.value}
            onChange={handleChange}
            getOptionLabel={(option) => option}
            renderOption={(props, option, { selected }) => {
              return (
                  <li {...props} data-value={option} className="checkboxes-list">
                    <Checkbox
                        className="checkboxes-checkbox"
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                        sx={{
                          '&.Mui-checked': {
                            color: '#2c2c2c',
                          },
                        }}
                    />
                    {option}
                  </li>
              );
            }
            }
            style={{ width: 500 }}
            renderInput={(params) => (
                <TextField {...params} name={props.name} placeholder={props.placeholder} />
            )}
        />
      </div>
  );
};

export default SelectMultiple;
