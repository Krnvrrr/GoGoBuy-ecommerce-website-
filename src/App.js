import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/seller/SellerHome";
import Login from "./components/seller/SellerLogin";
import Signup from "./components/seller/SellerSignup";
import AddProduct from "./components/seller/addProduct";
import EditProduct from "./components/seller/editProduct";
import CostumerHome from "./components/costumer/CostumerHome";
import CostumerLogin from "./components/costumer/CostumerLogin";
import CostumerCart from "./components/costumer/CostumerCart";
import Select from "./components/Select";
import { useState } from "react";
import CostumerSignup from "./components/costumer/CostumerSignup";
import Alert from "./components/Alert";
function App() {
  let [user,setuser]=useState("");
  let [why,setwhy]=useState(0)
  let [notify,setnotify] = useState(null)
  let notification= (a1,a2)=>{
    setnotify({type:a1,content:a2});
    setTimeout(() => {
      setnotify(null);
    }, 2000);
  }
  let set_why=(a)=>{
     setwhy(a)
  }
  let check=user==='Costumer';
  console.log(user,check)
  return (
    <Router>
      <Nav why={why} setwhy={set_why}/>
      <Alert notify ={notify}/>
        {check?
          <Routes>
      <Route exect path="/" element={<Select setuser={setuser} />} />
      <Route exect path="/home" element={<CostumerHome notification={notification} />} />
      <Route exect path="/login" element={<CostumerLogin notification={notification} why={why} setwhy={set_why} />} />
      <Route exect path="/signup" element={<CostumerSignup why={why} setwhy={set_why} />} />
      <Route exect path="/CostumerCart" element={<CostumerCart notification={notification}  />} />
      </Routes>
      :
      <Routes>
      <Route exect path="/" element={<Select setuser={setuser} />} />
      <Route exect path="/Home" element={<Home notification={notification} />} />
      <Route exect path="/addProduct" element={<AddProduct notification={notification} />} />
      <Route exect path="/editProduct" element={<EditProduct />} />
      <Route exect path="/login" element={<Login why={why} setwhy={setwhy} notification={notification} />} />
      <Route exect path="/signup" element={<Signup why={why} setwhy={setwhy} />} />
      <Route exect path="/CostumerCart" element={<CostumerCart />} />
      </Routes>
    }
      
    </Router>
  );
} 

export default App;
