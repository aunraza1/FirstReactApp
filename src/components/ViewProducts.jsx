
import firebase from '../config/firebase'
import {useState} from 'react'

function ViewProducts(){
  
  const [pnameArr,setpnameArr]=useState([])
  const [pqtyArr,setpqtyArr]=useState([])
  const [pqltyArr,setpqltyArr]=useState([])
  const[purchasepArr,settpurchasep]=useState([])
  const[sellingpArr,setsellingp]=useState([])
  const[ptypeArr,setpype]=useState([])
 

  let getData= ()=>{
    var items=[]
    firebase.database().ref('products').orderByKey().once('value', (snapshot) => {
      snapshot.forEach((child) => {
         
          items.push(child.val());
          
      })
      console.log(items)
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
    let update= (i)=>{
      console.log(i)
    }
     
 
    
  
return(
<div>
  
  
  <button onClick={()=>getData()}>Show</button>
  
<table border="1">  
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
            <button onClick={()=>update(i)}>Update</button>
            <button>Delete</button>
            
          </tr>
          
        
          


        })}
        
        
      
        </tbody> 
      </table>

</div>
)
}
export default ViewProducts