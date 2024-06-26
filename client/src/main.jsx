import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
// import 'bootstrap/dist/css/bootstrap.min.css';

import App from "./App";
import { store } from "./store/store";

import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />
    </Provider>
);
