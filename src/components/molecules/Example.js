import React from 'react';
import Grid from '@material-ui/core/Grid';
import DeleteButton from '../atoms/DeleteButton';
import TextField from '../atoms/TextField';

const Example = ({ example, index, handleChangeInput, handleClickDeleteItem }) => (
  <Grid key={index + 1} container item direction='row' justify='space-between'>
    <Grid item sm={5}>
      <div>
        예제 입력 {index + 1}
      </div>
      <TextField name="input" fullWidth
        variant='outlined' row={5} maxRow={Infinity} multiline
        value={example.input} handleChange={(e) => handleChangeInput(e, index)} />
    </Grid>
    <Grid item sm={5}>
      <div>
        예제 출력 {index + 1}
      </div>
      <TextField name="output" fullWidth
        variant='outlined' row={5} maxRow={Infinity} multiline
        value={example.output} handleChange={(e) => handleChangeInput(e, index)} />
    </Grid>
    <Grid container direction='row' justify='flex-end'>
      <Grid item>
        <DeleteButton onClick={() => handleClickDeleteItem(index)} />
      </Grid>
    </Grid>
  </Grid>);

export default Example;