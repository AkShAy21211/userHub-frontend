import React from "react";
import { createRoot } from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";
import Layout from "./components/layout/Layout";

const root = createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
      <App />
  </Provider>
);
