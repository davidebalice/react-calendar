import React from "react";
import ReactDOM from "react-dom/client";
import Header from "./common/Header";
import Main from "./common/Main";
import Calendar from "./components/Calendar";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "./common/Context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <Header />
      <Main>
        <Calendar />
      </Main>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();