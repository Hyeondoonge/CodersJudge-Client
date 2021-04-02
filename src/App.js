import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ProblemListApp from './ProblemList/ProblemListApp';
import SolutionListApp from './SolutionList/SolutionListApp';
import SolutionListAppWrapper from './SolutionList/SolutionListAppWrapper';
import ProblemFormApp from './ProblemForm/ProblemFormApp';
import SolutionFormApp from './SolutionForm/SolutionFormApp';
import ProblemDetailApp from './ProblemDetail/ProblemDetailApp';
import SolutionDetailApp from './SolutionDetail/SolutionDetailApp';
import Nav from './Nav';

const App = () => (
  <>
    <Router basename="/oj">
      <Nav />
      <Switch>
        <Route path="/" exact component={ProblemListApp} />
        <Route path="/solutions" exact component={SolutionListApp} />
        <Route path="/solutions/:problemNo/:problemTitle/:pageNum" component={SolutionListAppWrapper} />
        <Route path="/solution/:solutionKey" component={SolutionDetailApp} />
        <Route path="/problems/:pageNum" component={ProblemListApp} />
        <Route path="/problemsForm" component={ProblemFormApp} />
        <Route path="/solutionForm/:problemKey/:problemTitle" component={SolutionFormApp} />
        <Route path="/problem/:problemKey" component={ProblemDetailApp} />
      </Switch>
    </Router>
  </>
);

export default App;