// Polyfills for ie11
// import "react-app-polyfill/ie11";
// import "url-search-params-polyfill";
// import "string-includes-polyfill";
// import "array.prototype.includes";
// import "string.prototype.repeat";

import React from "react";
import ReactDOM from "react-dom";
import store, { history } from "./redux/store";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import App from "./components/App";

// UI components to bundle centrally instead of within each page chunk
import "react-md/lib/Buttons/Button";
// import "react-md/lib/TextFields/TextField";
// import "react-md/lib/Pickers/DatePicker";

let prevLocation = {};
history.listen(function(location) {
  // scroll to top
  if (prevLocation.pathname !== location.pathname) {
    window.scrollTo(0, 0);
  }
  prevLocation = location;
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
