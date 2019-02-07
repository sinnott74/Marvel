import React from "react";
import PropTypes from "prop-types";
import ComicListItem from "./ComicListItem";
import InfiniteScroll from "react-infinite-scroller";
import Grid from "react-md/lib/Grids/Grid";
import Cell from "react-md/lib/Grids/Cell";
import "./ComicList.css";

export default class ComicList extends React.PureComponent {
  render() {
    const comics = this.props.comics.map(comic => {
      return (
        <Cell key={comic.id} size={3}>
          <ComicListItem key={comic.id} {...comic} />{" "}
        </Cell>
      );
    });

    return (
      <div className="comiclist">
        <InfiniteScroll
          pageStart={0}
          loadMore={page => this.props.loadComics(page)}
          threshold={340}
          useWindow={true}
          hasMore={true}
          loader={
            <div className="comiclist__loader" key={0}>
              Loading ...
            </div>
          }
        >
          <Grid className="grid-example">{comics}</Grid>
        </InfiniteScroll>
      </div>
    );
  }
}

ComicList.propTypes = {};
