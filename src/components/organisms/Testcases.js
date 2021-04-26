import React, { useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import BasicButton from '../atoms/BasicButton';
import TextField from '../atoms/TextField';

const Testcases = ({ testcases, updateTestcases }) => {
  const textRef = useRef(null);
  const fileInputRef = useRef(null);

  const onFileUpload = (event) => {
    const { files } = event.target;
    if (files.length % 2 !== 0) {
      textRef.current.innerHTML = '입력과 출력 파일을 같이 업로드해주세요.';
      return;
    }

    for (let i = 1; i < files.length; i += 2) {
      const inNum = files[i - 1].name.split('.')[0];
      const outNum = files[i].name.split('.')[0];
      if (inNum !== outNum) {
        textRef.current.innerHTML = '입력과 출력 파일을 같이 업로드해주세요.';
        return;
      }
    }

    const newTestcases = [{ input: '', output: '' }];
    const testcaseLen = newTestcases.length - 1;

    let idx = 0;
    let loadedCount = 0;

    textRef.current.innerHTML = '업로드 중...';

    const sortedFiles = [...files].sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    sortedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onload = function () {
        if (newTestcases[testcaseLen + idx].input !== ''
          && newTestcases[testcaseLen + idx].output !== '') {
          idx += 1;
          newTestcases[testcaseLen + idx] = { input: '', output: '' };
        }
        if (file.name.split('.')[1] === 'in') {
          newTestcases[testcaseLen + idx].input = reader.result;
        } else {
          newTestcases[testcaseLen + idx].output = reader.result;
        }
        loadedCount += 1;
        if (loadedCount === files.length) {
          updateTestcases(newTestcases);
          textRef.current.innerHTML = '';
        }
      };
      reader.readAsText(file);
    });
  };

  return <Grid container direction='column' spacing={2}>
    {testcases.map((testcase, number) => <Grid container item key={number + 1} direction='row' justify='space-between'>
      <Grid item sm={5}>
        <div>
          테스트케이스 입력 {number + 1}
        </div>
        <TextField variant='outlined' row={5}
          maxRow={Infinity} multiline fullWidth
          value={testcase.input}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
      <Grid item sm={5}>
        <div>
          테스트케이스 출력 {number + 1}
        </div>
        <TextField variant='outlined' row={5}
          maxRow={Infinity} multiline fullWidth
          value={testcase.output}
          InputProps={{
            readOnly: true,
          }}
        />
      </Grid>
    </Grid>)}
    <Grid item style={{ textAlign: 'right' }}>
      <span style={{ padding: '1%', color: '#828282' }} ref={textRef}>
        테스트케이스를 업로드 해주세요.
      </span>
      <BasicButton label='테스트케이스 업로드'
        handleClick={() => { fileInputRef.current.click(); }} />
      <input ref={fileInputRef} id="upload" type="file" accept="text/plain" onChange={onFileUpload} multiple
        style={{ display: 'none' }} />
    </Grid>
  </Grid>;
};

export default Testcases;