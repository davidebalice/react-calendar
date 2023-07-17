import React, { createContext, useState } from "react";

export const Context = createContext();

export function Provider({ children }) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  return (
    <Context.Provider
      value={{
        show,
        setShow,
        handleShow,
      }}
    >
      {children}
    </Context.Provider>
  );
}
