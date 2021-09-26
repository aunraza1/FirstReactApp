import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({



  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  input: {
    color: "red"
  }

}));

export default function DatePickers(props) {
  const classes = useStyles();
  const[date,setDate]=useState()

  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

  return (
    
    <form className={classes.container} noValidate>
      <TextField
        id="date"
        label="Transaction Date"
        type="date"
        defaultValue={formatDate()}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={(e)=>setDate(e.target.value)}
      />
      {props.getDate(date)}
    </form>
  );
}
