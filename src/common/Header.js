import React, { useContext } from "react";
import classes from "./Header.module.css";
import { Context } from "../common/Context";
import Button from "react-bootstrap/Button";

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
                    <img
                      src={window.location.origin + "/assets/img/logo/logo.png"}
                      alt="db logo"
                      className={classes.logo}
                    />
                  </div>
                </div>
                <div className="col-6 justify-content-end text-right">
                  <Button className={classes.buttonModal} onClick={handleShow}>
                    <b>+</b> Add event
                  </Button>
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
