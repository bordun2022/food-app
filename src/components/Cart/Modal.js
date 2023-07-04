import React from "react";
import classes from "../Cart/Modal.module.css";
import ReactDOM from "react-dom";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHide} />;
}; // вихід з вікна, шляхом натискання на будь-яке місце на екрані

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
}; // вихід з вікна шляхом натискання на кнопку
// props.children вставлятиме текст контенту, який нам потрібен

const Modal = (props) => {
  return <React.Fragment>
   {ReactDOM.createPortal(<Backdrop onHide={props.onHide}/>,
        document.getElementById('overlays') 
      )};
   {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>,
        document.getElementById('overlays')
      )}
  </React.Fragment>;
}; // портал вимагає два аргументи що переміщати та куди

export default Modal; // ми створили ще один <div> в index.html, який знаходиться в public.
// Туди ми будемо робити portal

// Якби ми не використовували Портал, то наш код в Modal виглядав би так: 
// return <React.Fragment>
//<Backdrop />;
//<ModalOverlay>{props.children}</ModalOverlay>
//</React.Fragment>;
// ПРОТЕ в коді порталс