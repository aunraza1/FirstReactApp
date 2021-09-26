import { useState } from "react"
import firebase from './config/firebase'

function Customers(){

const[partyName,setPartyName]=useState()
const[partyContact,setPartyContact]=useState()

let addParty=(event)=>{
    event.preventDefault()

   var key = firebase.database().ref('customers').push().key
    let  customers={
       key:key,
       partyName:partyName,
       partyContact:partyContact,
       bill:null
   }
   firebase.database().ref('customers/'+ key).set(customers,(error)=>{
       if (error){
           alert("Failed")
       }
       else{
           alert("Party Added Successfully")
       }
   })
   event.target.reset()

  


    
}
return(
    <div>

<form onSubmit={addParty}>
<input type="text" placeholder="Enter Party Name" onChange={(e)=>setPartyName(e.target.value)} />
   <br />
    <input type="text" placeholder="Enter Party Contact" onChange={(e)=>setPartyContact(e.target.value)} />
    <br />
    <input type="submit" value="Add Party" />
</form>
    </div>
)
}
export default Customers