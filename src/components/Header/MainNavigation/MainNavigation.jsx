import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";
import SideMenu from "../SideMenu/SideMenu";
import Backdrop from "../Backdrop/Backdrop";

const MainNavigation = (p) => {
  const [sideOpen, setSideOpen] = useState(false);
  const openSideMenuHandler = () => {
    setSideOpen(true);
  };

  const closeSideMenuHandler = () => {
    setSideOpen(false);
  };
  return (
    <>
      {sideOpen && <Backdrop onClick={closeSideMenuHandler} />}

      <SideMenu show={sideOpen} onClick={closeSideMenuHandler}>
        <nav className="main-navigation_side-menu">
          <NavLinks />
        </nav>
      </SideMenu>

      <MainHeader>
        <button className="main-navigation_btn" onClick={openSideMenuHandler}>
          <span />
          <span />
          <span />
        </button>
        <h1 className="main-navigation_title">
          <Link to="/">Places</Link>
        </h1>
        <nav className="main-navigation_header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
