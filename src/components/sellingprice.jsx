import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import '../App.css'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
   
     
    },
   
  
  },
  textField:{
    border:"1px solid white",

  }
  
}));


export default function FormPropsTextFields(props) {
    const classes = useStyles();


    if (props.price!==null){
        var sellinPrice=props.price
    }
    else{
        sellinPrice=null
    }
  
    return (


<TextField
          id="outlined-number"
          className={classes.textField}
          label="Selling Price"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onFocus={(e)=>e.target.value=sellinPrice}
        />
    )
}