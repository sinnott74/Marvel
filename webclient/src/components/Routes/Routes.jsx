import React from "react";
import { Route, Switch, withRouter } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Spinner from "../Spinner";
import ComicList from "../../containers/ComicList";
import Comic from "../../containers/Comic";
import RouteNotFound404 from "../RouteNotFound404";
import "./Routes.css";

const Routes = props => {
  return (
    <div className="main" role="main">
      <TransitionGroup className="transition-group">
        <CSSTransition
          key={props.location.key}
          timeout={{ enter: 150 }}
          classNames="fade"
          exit={false}
        >
          <div className="routes">
            <React.Suspense fallback={<Spinner />}>
              <Switch location={props.location}>
                <Route exact path="/" component={ComicList} />
                <Route path="/comics/:id" component={Comic} />
                <Route component={RouteNotFound404} />
              </Switch>
            </React.Suspense>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
};

export default withRouter(Routes);
