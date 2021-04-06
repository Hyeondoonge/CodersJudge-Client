import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import ProblemListApp from './ProblemList/ProblemListApp';
import SolutionListAppWrapper from './SolutionList/SolutionListAppWrapper';
import ProblemFormApp from './ProblemForm/ProblemFormApp';
import SolutionFormApp from './SolutionForm/SolutionFormApp';
import ProblemDetailApp from './ProblemDetail/ProblemDetailApp';
import SolutionDetailApp from './SolutionDetail/SolutionDetailApp';
import { OurLink } from './OurLink';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#4995F2',
    },
  },
});

const Nav = () => (
  <nav>
    <h3>==테스트용 네비게이션======</h3>
    <ul>
      <OurLink to="/allSolutions/1">
      <li>전체 풀이 제출 현황</li>
      </OurLink>
      <OurLink to="/problems/1">
      <li>문제 리스트</li>
      </OurLink>
      <OurLink to="/problemsForm">
      <li>문제 제출</li>
      </OurLink>
    </ul>
    <h3>=========================</h3>
  </nav>
);

const App = () => (
  <ThemeProvider theme={theme} >
  <Router basename="/oj">
    <Nav />
    <Switch>
      <Route path="/" exact component={ProblemDetailApp} />
      <Route path="/problemsForm" exact component={ProblemFormApp} />
      <Route path="/problems/:pageNum" exact component={ProblemListApp} />
      <Route path="/problem/:problemKey" exact component={ProblemDetailApp} />

      <Route path="/solutionForm/:problemKey/:problemTitle" exact component={SolutionFormApp} />
      <Route path="/solutions/:problemNo/:problemTitle/:pageNum" exact component={SolutionListAppWrapper} />
      <Route path="/solution/:solutionKey" exact component={SolutionDetailApp} />

      <Route path="/allSolutions/:pageNum" exact component={SolutionListAppWrapper} />
    </Switch>
    </Router>
  </ThemeProvider>
);

export default App;