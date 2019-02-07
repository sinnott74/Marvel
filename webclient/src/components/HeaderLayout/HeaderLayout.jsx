import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Link from "../../containers/Link";
import Marvel from "../../images/marvel.svg";
import "./HeaderLayout.css";

export default class HeaderLayout extends React.PureComponent {
  render() {
    return (
      <div className="header-layout">
        <div className="header" role="banner">
          <Link to={"/"}>
            <Icon img={Marvel} alt={"Marvel Icon"} className="header__icon" />
          </Link>
        </div>
        <div className="header-layout_main">{this.props.children}</div>
      </div>
    );
  }
}

HeaderLayout.propTypes = {};
