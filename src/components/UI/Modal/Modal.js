import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";

const Backdrop = (props) => {
  //return <div className="modal-backdrop" onClick={props.onClose}></div>;
  return <div className={classes.backdrop} onClick={props.onClose}></div>
};

const ModalOverlay = (props) => {
  /*return (
    <div className="modal fade">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">
              <h2>{props.title}</h2>
            </div>
            <div className="modal-body">{props.children}</div>
            <div className="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );*/
  return (
    <div className={classes.modal}>
      <div className={classes.content}>
        {props.children}
      </div>
    </div>
  );
};

const portalElement = document.getElementById("overlay");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
      {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
    </Fragment>
  );
};

export default Modal;
