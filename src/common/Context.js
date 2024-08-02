import React, { createContext, useState } from "react";

export const Context = createContext();

export function Provider({ children }) {
  const [modalType, setModalType] = useState("add");
  const [show, setShow] = useState(false);
  const [info, setInfo] = useState(false);
  const handleShow = () => setShow(true);
  const handleInfo = () => setInfo(true);

  return (
    <Context.Provider
      value={{
        show,
        setShow,
        handleShow,
        modalType,
        setModalType,
        info,
        setInfo,
        handleInfo,
      }}
    >
      {children}
    </Context.Provider>
  );
}
