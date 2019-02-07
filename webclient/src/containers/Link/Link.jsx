import Link from "../../components/Link";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    handleClick: e => {
      if (ownProps.onClick) {
        ownProps.onClick();
      }
    }
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Link)
);
