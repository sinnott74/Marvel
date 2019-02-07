import React from "react";
import PropTypes from "prop-types";
import Paper from "react-md/lib/Papers";
import Link from "../../containers/Link";
import "./ComicListItem.css";

const ComicListItem = props => {
  const thumbnail = getThumbnailUrl(props);
  return (
    <Link to={`/comics/${props.id}`}>
      <Paper className="comiclistitem" zDepth={3}>
        <img
          className="comiclistitem__thumbnail"
          src={thumbnail}
          alt={props.title}
        />
        <div className="comiclistitem__title">{props.title}</div>
      </Paper>
    </Link>
  );
};

/**
 * @param comic Information about the comic.
 * @param comic.thumbnail Information about the comic's thumbnail.
 * @param comic.thumbnail.extension The thumbnail's image extension.
 * @param comic.thumbnail.path The thumbnail's path
 */
const getThumbnailUrl = comic => {
  return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
};

export default ComicListItem;

ComicListItem.propTypes = {
  title: PropTypes.string.isRequired,
  thumbnail: PropTypes.shape({
    path: PropTypes.string.isRequired,
    extension: PropTypes.string.isRequired
  }).isRequired
};
