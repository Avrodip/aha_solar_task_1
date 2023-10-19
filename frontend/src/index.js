import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Import the Provider from react-redux
import store from "./features/store"; // Import your Redux store
import "./index.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";


ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
    
