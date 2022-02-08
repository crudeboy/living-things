import './page.scss';
import React, { ReactNode } from 'react';

const Page = (props: {
  heading?: ReactNode | string;
  children?: ReactNode | string;
  buttonType?: string;
  headingButton?: ReactNode | string;
  className?: string;
  handleHeadingButton?: () => void;
  busy?: boolean;
}) => {
  return (
    <div className={'page' + (props.className ? ` ${props.className}` : '')}>
        <div className="page__header">
          <h1>{props.heading}</h1>
          <button
              onClick={props.handleHeadingButton}
              className={"button " + (props.buttonType ? props.buttonType : '')}
          >
            {props.headingButton}
          </button>
          <div className={'activity-indicator' + (props.busy ? ' busy' : '')}></div>
        </div>
        {props.children && (
            <div className="page__content">
              {props.children}
            </div>
        )}
      </div>
  );
};

export default Page;
