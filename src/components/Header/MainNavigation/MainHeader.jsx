import React from "react";
import './MainHeader.css';

const MainHeader = p => {
    return <header className="main-header">{p.children}</header>
};

export default MainHeader;