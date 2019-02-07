import React from "react";
import PropTypes from "prop-types";
import Paper from "react-md/lib/Papers";
import Spinner from "../Spinner";
import "./Comic.css";

export default class Comic extends React.PureComponent {
  componentDidMount() {
    this.props.loadComicsByID(this.props.id);
  }
  render() {
    if (!this.props.comic) {
      return <Spinner />;
    }
    const thumbnail = getThumbnailUrl(this.props.comic);
    return (
      <Paper className="comic" zDepth={3}>
        <img
          className="comic__thumbnail"
          src={thumbnail}
          alt={this.props.comic.title}
        />
        <div className="comic__details">
          <h1 className="comic__title">{this.props.comic.title}</h1>
          {this.props.comic.description && (
            <div
              className="comic__description"
              dangerouslySetInnerHTML={{ __html: this.props.comic.description }}
            />
          )}
        </div>
      </Paper>
    );
  }
}

/**
 * @param comic Information about the comic.
 * @param comic.thumbnail Information about the comic's thumbnail.
 * @param comic.thumbnail.extension The thumbnail's image extension.
 * @param comic.thumbnail.path The thumbnail's path
 */
const getThumbnailUrl = comic => {
  return `${comic.thumbnail.path}.${comic.thumbnail.extension}`;
};

Comic.propTypes = {};
