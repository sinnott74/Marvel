import Comic from "../../components/Comic";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { loadComicsByID, getComicByID } from "../../ducks/comic";

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  comic: getComicByID(state, ownProps.match.params.id)
});

const mapDispatchToProps = {
  loadComicsByID: loadComicsByID
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Comic)
);
