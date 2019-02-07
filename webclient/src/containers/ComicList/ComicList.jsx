import ComicList from "../../components/ComicList";
import { connect } from "react-redux";
import { loadComics, getComics } from "../../ducks/comic";

const mapStateToProps = state => ({
  comics: getComics(state)
});

const mapDispatchToProps = {
  loadComics: loadComics
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ComicList);
