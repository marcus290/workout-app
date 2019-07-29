import { observer } from "mobx-react-lite";
import { WorkoutHistory } from "./modules/WorkoutHistory";
import { CurrentWorkout } from "./modules/CurrentWorkout";
import { Router, Switch, Route } from "./Router/index";
import React from "react";

export const Routes = observer(() => {
   
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={WorkoutHistory} />
          <Route exact path="/current-workout" component={CurrentWorkout} />
          <Route exact path="/:year-:month-:day" component={CurrentWorkout} />
        </Switch>
      </Router>
        );
});