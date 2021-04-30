import React, { useEffect, useState } from 'react';
import {
  Button, Grid, FormControlLabel,
  FormLabel, RadioGroup, Radio, Backdrop, CircularProgress,
} from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CodeEditor from '../atoms/CodeEditor';
import JudgeProgress from '../organisms/JudgeProgress';
import { fetchAndJson } from '../../OurLink';
import Error from '../atoms/Error';
import { _handleFetchRes } from '../../utils';
import PageTemplate from '../templates/PageTemplate';

const useStyles = makeStyles((theme) => ({
  children: {
    [theme.breakpoints.down('sm')]: {
      margin: '1% 0',
    },
    [theme.breakpoints.up('md')]: {
      margin: '1% 0',
    },
  },
}));

const StyledButton = withStyles({
  root: {
    width: '100px',
    textAlign: 'center',
    color: 'white',
    backgroundColor: 'black',
    padding: '2% 1%',
    '&:hover': {
      backgroundColor: '#CE2727',
    },
  },
})(Button);

const SolutionForm = (props) => {
  const classes = useStyles();

  const { problemKey } = props.match.params;
  const { history } = props;

  // const [solution, setSolution] = useState({});
  const [error, setError] = useState(null);
  const [problem, setProblem] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [sourceCode, setSourceCode] = useState('');

  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [judgeState, setJudgeState] = useState(null);

  const fetchLanguages = async () => {
    const result = await fetchAndJson('/api/availableLanguages');
    _handleFetchRes(result.status, setError, () => {});
    return result.availableLanguages;
  };

  const fetchProblem = async () => {
    const result = await fetchAndJson(`/api/problems/${problemKey}`);
    _handleFetchRes(result.status, setError, () => {});
    return result.problem;
  };

  const fetchJudgeResult = async (solutionKey, updateOpen, updateProgress) => {
    const result = await fetchAndJson(`/api/solutions/${solutionKey}`);
    const { testcaseHitCount, testcaseSize, state } = result.solution;
    setJudgeState(state);
    updateProgress((testcaseHitCount / testcaseSize) * 100);

    if (state > 1) {
      setTimeout(() => {
        updateOpen(false);
        history.push(`/solutions?problemKey=${problem.key}&page=1`);
      }, 3000);
    } else {
      setTimeout(() => { fetchJudgeResult(solutionKey, updateOpen, updateProgress); }, 16);
    }
  };

  const fetchSolution = async (data, updateSubmitting, updateOpen, updateProgress) => {
    updateSubmitting(true);

    const result = await fetchAndJson('/api/solutions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    _handleFetchRes(result.status, setError, () => {
      updateSubmitting(false);
      updateOpen(true);
      fetchJudgeResult(result.solution.key, updateOpen, updateProgress);
    });
  };

  const handleSubmit = async () => {
    if (!selectedLanguage) {
      alert('언어를 선택해주세요');
      return;
    }

    if (!sourceCode) {
      alert('코드를 입력해주세요');
      return;
    }

    const data = {
      problemKey: problem.key,
      language: selectedLanguage,
      sourceCode,
    };

    fetchSolution(data, setIsSubmitting, setOpen, setProgress);
  };

  useEffect(() => {
    (async () => {
      const loginData = await fetchAndJson('/api/auth');
      if (!loginData.isAuthenticated) {
        window.location.replace(`https://codersit.co.kr/bbs/login.php?url=%2Foj/submit/${problemKey}`);
        return;
      }
      setIsLoaded(true);

      // solution fetch 추가로 넣고 handleSubmit 시 fetch 추가로 구현하면
      // 풀이 수정도 가능.
      // setSolution({
      //   key: null,
      //   problemKey,
      //   language: 'python', // language default value: python
      //   sourceCode: '',
      // });
      setLanguages(await fetchLanguages());
      setProblem(await fetchProblem());
      // setSolution 관련은 나중에
    })();
  }, []);

  if (error) {
    return <Error error={error} />;
  }

  if (!isLoaded) {
    return null;
  }

  return <PageTemplate content={(<Grid className={classes.root} container>
    {(problem === null || languages === null) ? (<CircularProgress size={30} />) : (<>
      <Grid className={classes.children} item xs={12}>
        <h3 style={{ margin: 0 }}>{`${problem.key}. ${problem.title}`}</h3>
      </Grid>
      <Grid className={classes.children} container item direction='column' xs={12}>
        <div style={{
          backgroundColor: '#F8F8F8', padding: '1%',
        }}>
          <Grid item>
            <FormLabel component="legend">
              <strong>언어 선택</strong>
            </FormLabel>
          </Grid>
          <Grid item>
            <RadioGroup name="language"
              value={selectedLanguage}
              onChange={(event) => {
                setSelectedLanguage(event.target.value);
              }}>
              {languages.map((language) => (
                  <FormControlLabel key={language} value={language} label={language}
                    control={<Radio color="default" />} />
              ))
              }
            </RadioGroup>
          </Grid>
        </div>
      </Grid>
    </>)}
    <Grid className={classes.children} item xs={12}
      style={{ border: '1px solid #E0E0E0' }}>
      <CodeEditor
        defaultValue={sourceCode}
        language={selectedLanguage}
        updateCode={setSourceCode}
      />
    </Grid>
    <Grid className={classes.children} item container direction='row-reverse' xs={12}>
      <Grid item>
        <StyledButton variant='contained' disabled={isSubmitting}
          size='medium' onClick={handleSubmit}>
          {!isSubmitting ? '풀이 제출하기' : '제출 중'}
        </StyledButton>
      </Grid>
      <Backdrop open={open} style={{ zIndex: 1 }}>
        <JudgeProgress judgeState={judgeState} progress={progress} />
      </Backdrop>
    </Grid>
  </Grid>
  )}/>
};

export default SolutionForm;