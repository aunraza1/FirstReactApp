import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
  
    
    },
    
    
  },
 
  

}));


export default function FormPropsTextFields(props) {
    const[qty,setqty]=useState("")

    const classes = useStyles();
    
  
    return (
        

<div>
    {props.quantity(qty)}
    
<TextField

          id="outlined-number"
          label="Selected Quantity"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          onChange={(e)=>setqty(e.target.value)}
         

        
        />
        
        </div>
      
    )
}