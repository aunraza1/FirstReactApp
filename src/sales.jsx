import { useState ,useEffect} from 'react';
import firebase from './config/firebase'
import PartyNames from './components/autocompletePartyNames'
import ProductNames from './components/autocompleteProductNames'
import ProductType from './components/prodctTypeInput'
import Date from './components/date'
import AvaialbleQty from './components/availableqty'
import SellingPrice from './components/sellingprice'
import SelectedQty from './components/selectedqty'
import { fireEvent } from '@testing-library/dom';


function Sales (){
  // const[onj,setObj]=useState({})
  const [partyName,setpartyName]=useState([])
  const [selectedParty,setSelectedParty]=useState("")
  const [ProductNamesArr,setproductNames]=useState([])
  const [selectedProduct,setselectedProdcuct]=useState("")
  const [AllProducts,setAllProducts]=useState([])
  const [selectedQuantiy,setselectedQuantity]=useState([])
  const [date,setDate]=useState()
  const [showComponent,setShowComponent]=useState(false)
  const [check,setcheck]=useState("unchecked")
  // const [sldObj,setObj]=useState({})
  const [dataArr,setArr]=useState([])
  const [addBills,setaddBills]=useState("")
  // const [party,setParty]=useState([])
  // const [transactionDate,settransactionDate]=useState([])
  // const [prNumber,setprNumber]=useState()
  // const [prType,setprType]=useState()
  // const [prPrice,setprPrice]=useState()
  // const [sellQuantiy,setsellQuantity]=useState()
  // const [total,settotal]=useState()
  
  let party=[];
  let transactionDate=[];
  let prNumber=[] 
  let prType=[]
  let prPrice=[]
  let sellQuantity=[]
  let total=[]
  let sum =0;

 
  
useEffect(()=>{
 getPartyNames()
 getProductName()
},[])

 let getPartyNames=async()=>{
  let customersData=[];
  let customerNames=[]
  
  await firebase.database().ref('customers/').orderByKey().once('value',(snapshot)=>{
    snapshot.forEach((child)=>{
      customersData.push(child.val())
    })
    customersData.forEach((element)=>{
       customerNames.push(element.partyName)
    })
    setpartyName(customerNames)
  })
  
}


let getProductName  = async()=>{
  let allProducts=[]
  let productNames=[]
  
  var database= firebase.database().ref('products/')
  database.orderByKey().once('value',(snapshot)=>{
    snapshot.forEach((child)=>{
      allProducts.push(child.val())

    })
    setAllProducts(allProducts)
    
    allProducts.forEach((element)=>{
      
    productNames.push(element.pname)
    
    })
    setproductNames(productNames)
   

 
    
    
  })


 
}


 let getSelectedPartyValue=(value)=>{
setSelectedParty(value)
}
let getSelectedProduct=(value)=>{
  setselectedProdcuct(value)
  
}
let getSelectedQuantity=(value)=>{
setselectedQuantity(value)
}

let getDate=(value)=>{
 setDate(value)
}

let addToSales=(event)=>{
event.preventDefault()
setShowComponent(true) 
let salesObj={
 party:selectedParty,
 transactionDate:date,
 PrNumber:selectedProduct,
 PrType:selectedobject?selectedobject.ptype:null,
 PrPrice:selectedobject?selectedobject.sellPrice  :null,
 selQuantity:selectedQuantiy,
 total: selectedobject?selectedobject.sellPrice * selectedQuantiy  :null,
 availqty:selectedobject?selectedobject.pqty:null


} 
dataArr.push(salesObj)
setArr(dataArr)

}
let reset=()=>{
  setShowComponent(false)
}
let key = firebase.database().ref('sales').push().key
let saveSales= ()=>{
  console.log(dataArr)

  
  let sale ={
    pkey:key,
    data:dataArr,
    grandTotal:sum
    
  }
  firebase.database().ref('sales/'+key).set(sale,(error)=>{
      if(error){
      alert("Transaction Save Failed ")
      }
      else{
      alert("Transaction Saved Successfully")
      }
  })                                            
let avlqty=[];
let selqty=[]; 



dataArr.forEach((element)=>{
  avlqty.push(element.availqty)
  selqty.push(element.selQuantity)

})

avlqty.map((v,i)=>{
 let pqty=avlqty[i]-selqty[i]
 var newData={
  pqty:pqty

}

 var query=firebase.database().ref('products').orderByChild('pname').equalTo(prNumber[i])
 query.on("child_added",(snapshot)=>{
  snapshot.ref.update(newData)
 })


})


var billsum;
var bills=[];
firebase.database().ref('customerStatement').orderByChild('party').equalTo(selectedParty).once('value',(snapshot)=>{
  snapshot.forEach((child)=>{
  bills.push(child.val().balance)
  
  })

 bills.map((v,i)=>{
      billsum=bills[bills.length-1]
 })

}).then(()=>{
   console.log("SUM=>",billsum)
   console.log("Balance=>",bills)
  var sKey = firebase.database().ref('customerStatement').push().key
let customerStatement={
  date:date,
  key:sKey,
  party:selectedParty,
  payment:0,
  invoice:key,
  billAmount:sum,
  balance:bills.length>0?billsum+sum:sum,
  keyParty:sKey+selectedParty
}
firebase.database().ref('customerStatement/'+sKey).set(customerStatement)
 
  
})





            


 

 
 
//  updateBalance(billsum,sKey)

  
  
}

let checktheCheck=()=>{
  setcheck("checked")
}

let unchektheCheck=()=>{
  setcheck("unchecked")
}

let selectedobject=AllProducts.find((a)=>a.pname===selectedProduct)
console.log(dataArr)
console.log(total)
console.log(prNumber)

let updateBalance=(data,key,bills)=>{

  let newData={

    balance:data,
    
    
   
  }
  var query=firebase.database().ref('customerStatement').orderByChild('keyParty').equalTo(key+selectedParty)
  query.on("child_added",(snapshot)=>{
   snapshot.ref.update(newData)
  })

  

 
  

}


// let pquantity=selectedobject.pqty
// let pquality=selectedobject.pquality
// let ptype=selectedobject.ptype
// let sellPrice=selectedobject.sellPrice


// console.log(AllProducts)
   

return(

  
    <div className= "row container-fluid invoice" >
    
  
      <div className="col-md-3">
        <h1 >Father & Sons  </h1>
        <h3 >Credit Sales</h3>
     <Date getDate={getDate}/>
     {/* {console.log(partyName)} */}
     {console.log(selectedParty)}
     {/* {console.log(productNames)} */}
     {/* {console.log(selectedProduct)}
     */}
       <br />
       {
       <PartyNames partyArr={partyName} getValue={getSelectedPartyValue} />
      }
        <br />
       <form onSubmit={addToSales}>
      <ProductNames  productNames={ProductNamesArr} getValue={getSelectedProduct} />
        <br />
      <ProductType  type={selectedobject?selectedobject.ptype:null} />
      <br />
      <SellingPrice price={selectedobject?selectedobject.sellPrice:null}/>
        <br/>      
        <br />
      <AvaialbleQty availqty={selectedobject?selectedobject.pqty:null}/>
        <br />
     <SelectedQty quantity={getSelectedQuantity}/>
     <br/>
     <input type="submit" value="Add to Sales" />
     
     </form>
     <button onClick={()=>reset()}>Rest</button>

     </div>

     {showComponent==true? <div className="col-md-9">
       
   <table border="1">

     
     <tbody>
     <tr>
       <th>{selectedParty}</th>
       <th>{date}</th>
     </tr>
     <tr>
       
       <th>Product Number</th>
       <th>Product Type</th>
       <th>Price(PKR)</th>
       <th>Quantiy</th>
       <th>Total</th>  
       
       

 {/* party:selectedParty,
 transactionDate:date,
 PrNumber:selectedProduct,
 PrType:selectedobject?selectedobject.ptype:null,
 PrPrice:selectedobject?selectedobject.sellPrice  :null,
 selQuantity:selectedQuantiy,
 total: selectedobject?selectedobject.sellPrice * selectedQuantiy  :null
 let transactionDate=[];
  let prNumber=[] 
  let prType=[]
  let prPrice=[]
  let sellQuantity=[]
  let total=[] */}
  
     </tr>
    
     {
          dataArr.forEach((element)=>{  
          party.push(element.party)
          transactionDate.push(element.transactionDate)
          prNumber.push(element.PrNumber)
          prType.push(element.PrType)
          prPrice.push(element.PrPrice)
          sellQuantity.push(element.selQuantity)
          total.push(element.total)
        })   }                                              
       
        
      
       

         {dataArr.map((v,i)=>{
           return(
            <tr>
            <td>{prNumber[i]}</td>  
            <td>{prType[i]}</td>
            <td>{prPrice[i]}</td>
            <td>{sellQuantity[i]}</td>
            <td>{total[i]}</td>
            </tr>
           )
         })} 
    
     <tr>
      
       <td colSpan="4" >Grand Total
       <input type="checkbox"name="Discount" value="discount" onChange={()=>check=="unchecked"?checktheCheck():unchektheCheck()} /> <label htmlFor="input">
         <b>Apply Discount</b></label>
       </td>
       
       {total.map((v,i)=>{
        
        check=="unchecked"?
         sum+= total[i]
         : sum+=total[i]*95/100

       })}
       
       <td>{sum}</td>
     </tr>

  
     
     </tbody>
   </table>
   <button onClick={()=>saveSales()} >Save Transaction</button>
   
     </div>:null}
    
     
    
     

    </div>
)    
    }


export default Sales