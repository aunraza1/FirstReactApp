import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';





export default function BasicTextFields(props) {



  
  if(props.availqty!==null){
    var availabelqty=props.availqty
    
     }
   else{
     availabelqty=null
   }
  
 
  return (
    <form  noValidate autoComplete="off">
    
      <TextField InputLabelProps={{
          shrink: true,
        }}  label="Available Quantity" variant="outlined" onFocus={(e)=>e.target.value=availabelqty}/>
      
    </form>
  );
} 