import { useEffect, useState } from 'react';
import  SelectCustomers from './components/SelectCustomers'
import '../src/App.css'
import firebase from './config/firebase'


function Statement(){

   const [selectedCustomer,setselectedCustomer]=useState()
   const [showComponent,setshowComponent]=useState(false)
   const [partyNames,setpartyNames]=useState([])
   const [Date,setDate]=useState("");
   const [Invoice,setInvoice]=useState("");
   const [BillAmount,setBillAmount]=useState("");
   const [Balance,setBalance]=useState("");
   const [Payment,setPayment]=useState("")

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
let showStatement=()=>{
    setshowComponent(true)
    var date=[];
    var billAmount=[];
    var balance=[];
    var invoice=[];
    var payment=[];
 
    
    firebase.database().ref('customerStatement').orderByChild('party').equalTo(selectedCustomer).once('value',(snapshot)=>{
     snapshot.forEach((child)=>{
         date.push(child.val().date)
         billAmount.push(child.val().billAmount)
         balance.push(child.val().balance)
         invoice.push(child.val().invoice)
         payment.push(child.val().payment)
         
         
           
     })
     console.log(payment)
     receiveData(date,billAmount,balance,invoice,payment)
     
    })
}   

let receiveData=(date,billAmount,balance,invoice,payment)=>{
    setDate(date)
    setBillAmount(billAmount)
    setBalance(balance)
    setInvoice(invoice)
    setPayment(payment)



}

   

    
return(
    <div className="customerStatement">
           <h1>Customer Statement</h1>
        <SelectCustomers options={partyNames} getvalue={getCustomerName}/>
        <button onClick={()=>showStatement()}>Show Statement</button>

      
      {(showComponent===true && selectedCustomer!==undefined)? <div>
            <table border="1px">
                <tbody>
                    <tr>
                        <th><h1>{selectedCustomer}</h1></th>
                    </tr>
                    <tr>
                        <th>Date</th>
                        <th>Invoice #</th>
                        <th>Bill Amount </th>
                        <th>Payment</th>
                        <th>Balance</th>
                    </tr>
                   
                {Date!==""?Date.map((v,i)=>{
                    return(
                        <tr>
                            <td key={i+"a"}>{Date[i]}</td>
                            <td key={i+"b"}>{Invoice[i]}
                            <button>View Invoice</button></td>
                            <td key ={i+"c"}>{BillAmount[i]}</td>
                            <td>{Payment[i]}</td>
                            <td key ={i+"e"}>{Balance[i]}</td>
                        </tr>
                    )
                  
                }):null}
                
                    
                </tbody>
            </table>
        </div>:null}
    </div>
)
}
export default Statement