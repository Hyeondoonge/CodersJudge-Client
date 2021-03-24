import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProblemListApp from './ProblemList/ProblemListApp';
import SolutionListApp from './SolutionList/SolutionListAppWrapper';
import ProblemFormApp from './ProblemForm/ProblemFormApp';
import SolutionFormApp from './SolutionForm/SolutionFormApp';
import Nav from './Nav';

const Home = () => (
  <div>
  홈입니당
  </div>
);

const App = () => (
  <Router>
    <Nav />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/solutions/:problemNo" component={SolutionListApp} />
      <Route path="/problems" component={ProblemListApp} />
      <Route path="/problemsForm" component={ProblemFormApp} />
      <Route path="/solutionForm" component={SolutionFormApp} />
    </Switch>
  </Router>
);

export default App;