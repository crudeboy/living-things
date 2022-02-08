import './Actions.scss';
import { ReactNode } from 'react';

const Actions = (props: {
    children?: ReactNode | string;
}) => {
    return (
        <div className="actions">{props.children}</div>
    );
};

export default Actions;
