import './modal.scss';

const Modal = (props: {
    show?: boolean;
    headline: String;
    text: String;
    handleClose?: () => void;
}) => {
    const showHideClassName = props.show ? "modal" : "modal hidden";

    return (
        <div className={showHideClassName}>
            <section className="header">
                <div className="headline">{props.headline}</div>
                <p>{props.text}</p>
            </section>
            <section className="footer">
                <button type="button" className="button is-info" onClick={props.handleClose}>
                    Close
                </button>
            </section>
        </div>
    );
};

export default Modal;
