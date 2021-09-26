import {BrowserRouter as Router, Route } from "react-router-dom";
import Listing from '../Listing'
import Sales from '../sales'
import Statement from '../customerStatement'
import AddPayment from '../addingPayements'


function AppRouter(){

    return(
<div>
    <Router>
        <Route exact path="/" component={Sales}></Route>
        <Route exact path="/Statement" component={Statement}></Route>
        <Route exact path="/Payments" component={AddPayment}></Route>
        <Route exact path="/Products" component={Listing}></Route>

        
    </Router>
</div>
    )

}
export default AppRouter