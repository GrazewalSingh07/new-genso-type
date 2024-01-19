import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./Redux/store.ts";
import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./Errorboundary.tsx";
import { MyContextProvider } from "./context.tsx";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <MyContextProvider>
      <Provider store={store}>
      <ErrorBoundary>
        <App />
        </ErrorBoundary>
      </Provider>
      </MyContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
