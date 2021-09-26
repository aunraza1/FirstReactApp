import React, { useState ,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';





export default function BasicTextFields(props) {
  const productType=React.useRef("")

  const [ptype,setptype]=useState("")
  

  if(props.type!==null){
 var prtype=props.type
 
  }
else{
  prtype=null
}
  // let focus=(e)=>{
  // e.target.value=prtype
  // }
 
  return (
    <form noValidate autoComplete="off">
    
      <TextField InputLabelProps={{
          shrink: true,
        }}  id="filled-required" label="Product Type" variant="outlined"  onFocus={(e)=>e.target.value=prtype} />
      
    </form>
  );
} 