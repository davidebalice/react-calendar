import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "./common/Context";
import Footer from "./common/Footer";
import Header from "./common/Header";
import Main from "./common/Main";
import Calendar from "./components/Calendar";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider>
      <Header />
      <Main>
        <Calendar />
      </Main>
      <Footer />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
