/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';


export default function PartyNames(props) {
  // console.log(props.partyArr)
 
  return (
    <Autocomplete
     
      options={props.partyArr}
      style={{ width: 200}}
      renderInput={(params) => <TextField {...params} label="Party Name" variant="outlined" id="filled-required"/>}
      onChange={(e,v)=>{props.getValue(v)}}
    

    />
  );
}



