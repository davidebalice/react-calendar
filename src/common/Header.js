import React, { useContext } from "react";
import { Context } from "../common/Context";

import github from "../assets/img/github.png";
import logo from "../assets/img/logo.png";

import classes from "./Header.module.css";

const Header = () => {
  const { handleShow } = useContext(Context);
  return (
    <>
      <header className={classes.header}>
        <div className="header-area">
          <div className="main-header header-sticky">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-6">
                  <div className={classes.logoContainer}>
                    <img src={logo} alt="db logo" className={classes.logo} />
                    <div className={classes.title}>Calendar React</div>
                  </div>
                </div>
                <div className="col-6 justify-content-end text-right">
                  <a
                    href="https://github.com/davidebalice/react-calendar"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={github}
                      alt="github logo"
                      className={classes.github}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
