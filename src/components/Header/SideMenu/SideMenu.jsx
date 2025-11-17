import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import "./SideMenu.css";

const SideMenu = (p) => {
  const nodeRef = useRef(null); // CSStransition esta desactualizado y rompe, debe referenciarse exactamente donde afecta para que funcione

  const content = (
    <CSSTransition
      in={p.show}
      timeout={200}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
      nodeRef={nodeRef} 
    >
      <aside ref={nodeRef} className="side-menu" onClick={p.onClick}> 
        {p.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(content, document.getElementById("side-menu-hook"));
};

export default SideMenu;
