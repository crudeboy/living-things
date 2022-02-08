import "./formGroup.scss";
import React, { ReactNode } from 'react';

const FormGroup = (props: {
  children?: ReactNode | string;
  title?: ReactNode | string;
  description?: ReactNode | string;
}) => {
  return (
      <div className="form-group">
        <div className="form-group__col form-group__col--text">
          {props.title && (
              <h4 className="form-group__label">{props.title}</h4>
          )}
          {props.description && (
              <p className="form-group__description">{props.description}</p>
          )}
        </div>
        <div className="form-group__col form-group__col--input">
          {props.children}
        </div>
      </div>
  );
};

export default FormGroup;