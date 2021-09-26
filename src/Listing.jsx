
import './App.css';
import React from 'react'
import {useState} from 'react'
import firebase from './config/firebase'
import './App.css'

// import ViewProducts from './components/ViewProducts'


function Listing() {

const [productNumber,setproductNumber]=useState()
const [productType,setproductType]=useState()
const [productQty,setproductQty]=useState()
const [productQlty,setproductQlty]=useState()
const [purchasingPrice,setpurchasingPrice]=useState()
const [sellingPrice,setsellingPrice]=useState()

const [showComponent,setShowComponent]=useState(false)
// const [Message,setMessage]=useState("")
const [pnameArr,setpnameArr]=useState([])
const [pqtyArr,setpqtyArr]=useState([])
const [pqltyArr,setpqltyArr]=useState([])
const[purchasepArr,settpurchasep]=useState([])
const[sellingpArr,setsellingp]=useState([])
const[ptypeArr,setpype]=useState([])
const[itemsArr,setitemsArr]=useState([])
const[btnName,setbtnName]=useState("Add Product")
const[selectedKey,setselectedKey]=useState()
const pNumberI=React.useRef("")
const pQtyI=React.useRef("")
const pQltyI=React.useRef("")
const pPurI=React.useRef("")
const pSelI=React.useRef("")
const ptI=React.useRef("")





 let addProduct=(event)=>{

  var key=firebase.database().ref('products').push().key
  var products ={
    pkey:key,
    pname:productNumber,
    ptype:productType,
    pqty:productQty,
    pquality:productQlty,
    purPrice:purchasingPrice,
    sellPrice:sellingPrice,
   
  }
  //  var {name,type}=customers
  
  console.log(key)
  var databaseRef=firebase.database().ref('products/'+key)
  databaseRef.set(products,(error)=>{
    if(error){
      alert("Failed!")       
    }
    else{
    
     alert("Produt Added Successfully")
    }
  })
  event.preventDefault()
  event.target.reset()
  
  }

//  let listProducts=()=>{
//    setShowComponent(true)
      
    
//  }
let getData= ()=>{
  setShowComponent(true)
  var items=[]
  firebase.database().ref('products/').orderByKey().once('value', (snapshot) => {
    snapshot.forEach((child) => {
       
        items.push(child.val());
        
    })
    console.log(items)
    setitemsArr(items)
    var pname=[]
    var pqty=[]
    var pquality=[]
    var purPrice=[]
    var sellPrice=[]
    var ptype=[]
    items.forEach((element) => {

    pname.push(element.pname)
    pqty.push(element.pqty)
    pquality.push(element.pquality)
    purPrice.push(element.purPrice)
    sellPrice.push(element.sellPrice)
    ptype.push(element.ptype)
    
      // console.log(index); // 0, 1, 2
      // console.log(array); // same myArray object 3 times
  });
  console.log(pqty)
  setpnameArr(pname)
  setpqtyArr(pqty)
  setpqltyArr(pquality)
  settpurchasep(purPrice)
  setsellingp(sellPrice)
  setpype(ptype)
    
  })
  
}

let edit= (i)=>{
   var selectedItems= itemsArr[i]
  pNumberI.current.value= selectedItems.pname
  pQtyI.current.value=selectedItems.pqty
  pQltyI.current.value=selectedItems.pquality
  pPurI.current.value=selectedItems.purPrice
  pSelI.current.value=selectedItems.sellPrice
  ptI.current.value=selectedItems.ptype
  
  setselectedKey(selectedItems.pkey)
  // setselectedKey(selectedItems.pkey)
  setbtnName("Update")
  console.log(selectedItems)
    
}
let update=(event)=>{
console.log("Update")
event.preventDefault()
console.log(selectedKey)


  firebase.database().ref('products/'+selectedKey).set({
    // pkey:selectedKey,
    // pname:productNumber,
    // ptype:productType,
    // pqty:productQty,
    // pquality:productQlty,
    // purPrice:purchasingPrice,
    // sellPrice:sellingPrice,
    pkey:selectedKey,
    pname:pNumberI.current.value,
    ptype:productType,
    pqty: pQtyI.current.value,
    pquality:pQltyI.current.value,
    purPrice:pPurI.current.value,
    sellPrice: pSelI.current.value
   


},(error)=>{
  if (error){
    alert("Failed!")
  }
  else{
    alert("Recoord Updated Successfully!")
  }

})


event.target.reset()
 setbtnName("Add Product")

 }



let remove=(i)=>{
  var selectedItems= itemsArr[i]
  console.log(selectedItems.pkey)  
  firebase.database().ref('products/'+selectedItems.pkey).remove()
  
}


 

  return(
    
    <div>
     <form onSubmit={btnName==="Add Product"?addProduct:update}>
      <input ref={pNumberI} type="text" placeholder="Product Number" onChange={(e)=>{setproductNumber(e.target.value)}}/>
      <br/>
      <input ref={pQtyI} type="text" placeholder=" Quantity" onChange={(e)=>{setproductQty(e.target.value)}}/>
      <br/>
      <input ref={pQltyI} type="text" placeholder="Product Quality" onChange={(e)=>{setproductQlty(e.target.value)}}/>
      <br/>
      <input ref={pPurI} type="password" placeholder="Purchasing Price" onChange={(e)=>{setpurchasingPrice(e.target.value)}}/>
      <br/>
      <input ref={pSelI} type="text" placeholder="Selling Price" onChange={(e)=>{setsellingPrice(e.target.value)}}/>
      <br/>
      <input ref={ptI} type="radio" value="A/F" name="type" onChange={(e)=>{setproductType(e.target.value)}}/>A/F
      <input ref={ptI} type="radio" value="O/F" name="type"  onChange={(e)=>{setproductType(e.target.value)}}/>O/F
      <input ref={ptI} type="radio" value="AC/F"name="type"  onChange={(e)=>{setproductType(e.target.value)}}/>AC/F
      <input ref={ptI} type="radio" value="F/F" name="type"  onChange={(e)=>{setproductType(e.target.value)}}/>F/F
      <br/>
      {/* <button onClick={()=>addProduct()}>Add Product</button>
      
     */}
     <input type="submit"value={btnName}/>
      </form>
     
      {/* <button onClick={()=>listProducts()}>List Products</button> */}
      
      <div>
  
  
  <button onClick={()=>getData()}>List Products</button>
   {showComponent===true?<table border="1">  
    <tbody>
        <tr>
          <th>Product Number</th>
          <th>Product Quantity</th>
          <th>Product Quality</th>
          <th>Purchasing Price</th>
          <th>Selling Price</th>
          <th>Product Type</th>
          
        </tr>
        
        {pnameArr.map((v,i)=>{
          return <tr key={i}>
            <td key={i}>{v}</td>
            <td >{pqtyArr[i]}</td>
            <td >{[pqltyArr[i]]}</td>
            <td>{purchasepArr[i]}</td>
            <td>{sellingpArr[i]}</td>
            <td>{ptypeArr[i]}</td>
            <button onClick={()=>edit(i)}>Edit</button>
            <button onClick={()=>remove(i)}>Delete</button>
            
          </tr>
          
        
          


        })}
        
        
      
        </tbody> 
      </table>:null}


</div>
      
      

     
      
    </div>
  )
}
export default Listing;
