import { useEffect, useState } from 'react'
import firebase from './config/firebase'
import SelectCustomers from './components/SelectCustomers'
import PaymentAmount from './components/paymentAmount'
import '../src/App.css'

function AddingPayments(){
    const [partyNames,setpartyNames]=useState([])
    const [selectedCustomer,setselectedCustomer]=useState()
    const [paymentAmount,setPaymentAmount]=useState([])
  
    
    var customerData=[];
    var customerNames=[];

    useEffect(()=>{
        let getNames =async()=>{
      
            await firebase.database().ref('customers/').orderByKey().once('value',(snapshot)=>{
              snapshot.forEach((child)=>{
             customerData.push(child.val())
              })
            
              customerData.forEach((element)=>{
               customerNames.push(element.partyName)
              })
              setpartyNames(customerNames)
            })
           
    }
        getNames()

    },[])
    
    let getCustomerName=(value)=>{
        setselectedCustomer(value)
        
        }
    let getSelectedAmount=(value)=>{
        setPaymentAmount(value)

    }    
let addPayement=()=>{


    var data =[]
    firebase.database().ref('customerStatement').orderByChild('party').equalTo(selectedCustomer).once('value',(snapshot)=>{
        
        snapshot.forEach((child)=>{
            data.push(child.val())


        })
        getIndex(data.length-1,data)
    
        
    })
        

        
   
}


let getIndex=(value,data)=>{
console.log(data[value].balance)
console.log(data[value].key)



 let newData ={
   
    payment:paymentAmount,
    balance:data[value].balance-paymentAmount,
}

 var query=firebase.database().ref('customerStatement').orderByKey().equalTo(data[value].key)
    query.on("child_added",(snapshot)=>{
        snapshot.ref.update(newData)
       })
}

             
return(
    <div className=" container-fluid">
        <SelectCustomers options={partyNames} getvalue={getCustomerName}/>
        <br />
        <PaymentAmount paymentAmount={getSelectedAmount}/>
        <button onClick={()=>addPayement()}>Add Payment</button>

    </div>
)
}
export default AddingPayments