import React, { createContext, useState } from "react";

export const Context = createContext();

export function Provider({ children }) {
  const [modalType, setModalType] = useState("add");
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <Context.Provider
      value={{
        show,
        setShow,
        handleShow,
        modalType,
        setModalType,
      }}
    >
      {children}
    </Context.Provider>
  );
}
