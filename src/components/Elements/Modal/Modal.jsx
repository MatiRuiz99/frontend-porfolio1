import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../../Header/Backdrop/Backdrop";
import "./Modal.css";

const ModalOverlay = React.forwardRef((p, ref) => {
  const content = (
    <div ref={ref} className={`modal ${p.className}`} style={p.style}>
      <header className={`modal_header ${p.headerClass}`}>
        <h2>{p.header}</h2>
      </header>
      <form onSubmit={p.onSubmit ? p.onSubmit : (event) => event.preventDefault()}>
        <div className={`modal_content ${p.contentClass}`}>{p.children}</div>
        <footer className={`modal_footer ${p.footerClass}`}>{p.footer}</footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
});

const Modal = (p) => {
  const nodeRef = useRef(null);

  return (
    <>
      {p.show && <Backdrop onClick={p.onCancel} />}
      <CSSTransition
        in={p.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef} // 👈 required in React 18+
      >
        <ModalOverlay ref={nodeRef} {...p} />
      </CSSTransition>
    </>
  );
};

export default Modal;
