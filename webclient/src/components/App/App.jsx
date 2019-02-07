import React from "react";
import PropTypes from "prop-types";
import HeaderLayout from "../HeaderLayout";
import Routes from "../Routes";
import { withRouter } from "react-router";
import "./App.css";

class App extends React.PureComponent {
  render() {
    return (
      <div className="app">
        <HeaderLayout>
          <Routes />
        </HeaderLayout>
      </div>
    );
  }
}
export default withRouter(App);

App.propTypes = {};
