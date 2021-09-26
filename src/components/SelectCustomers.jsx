/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function PartyNames(props) {
  
 
  return (
      <div>

     
    <Autocomplete
     
      options={props.options}
      style={{ width: '100%',marginTop:'1%'}}
      renderInput={(params) => <TextField {...params} label="Party Name" variant="outlined"  />}
      onChange={(e,v)=>props.getvalue(v)}

    />
    
     </div>
  );
}



