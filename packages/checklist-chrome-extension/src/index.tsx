import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import Checklists from "./components/Checklists";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Checklists />
  </Provider>,
  document.getElementById("root")
);
