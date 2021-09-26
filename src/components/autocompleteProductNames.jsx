/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function ProductNames(props) {
  // console.log(props.partyArr)
  console.log(props)

  
 
  return (
    <div>
    <Autocomplete
    
      options={props.productNames}
      style={{ width: 200,}}
      renderInput={(params) => <TextField {...params} label="Product Number" variant="outlined" id="filled-required"/>}
      onChange={(e,v)=>{props.getValue(v)}}
      
    />
  
  
    </div>
  );
}



