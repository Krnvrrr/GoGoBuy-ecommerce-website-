import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
export default function Signup({why,setwhy}) {
  let history=useNavigate();
  let [user,setuser]=useState({
    name:"",email:"",password:"",cpassword:"",company_name:""
  })
  let onchange = (e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }
  let handleclick = async (e)=>{
    e.preventDefault();
    let {email,name,password,cpassword,company_name}=user;
    if(password!==cpassword){alert('plese confirm your password')}
    else {
    let response = await fetch("http://127.0.0.1:5000/admin/Register", {
      method: "POST", // or 'PUT'
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({"email":email,"name": name,"password": password,"company_name":company_name}),
  })
  let data =await response.json();
  if(response.status===200){
     localStorage.setItem('token',data.token);
     setwhy(why=>why+1)
     history('/home')
  }
  else {
    alert(data.message)
  }
}
}
  return (
    <div className='md:flex m-6'>
        <div className=' m-6  '>
          <h1 className='text-6xl font-thin'>GoGoBuy</h1>  
          <h1 className='text-4xl font-thin'>Seller</h1>
        </div>
      
<form className=" md:w-3/4">
<div className="mb-6">
    <label htmlFor="name"  className="block mb-2 text-sm font-medium text-gray-900 ">Your Name</label>
    <input type="text" id="name" name='name' onChange={onchange} value={user.name}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="company_name"  className="block mb-2 text-sm font-medium text-gray-900 ">Your Company's Name</label>
    <input type="text" id="company_name" name='company_name' onChange={onchange} value={user.company_name}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className=" mb-6">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
    <input type="email" id="email" name='email' onChange={onchange} value={user.email}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
    <input type="password" name="password" onChange={onchange} value={user.password}  id="password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="mb-6">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 ">Repeat password</label>
    <input type="password" id="repeat-password" name="cpassword" onChange={onchange} value={user.cpassword}  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
  </div>
  <div className="mb-4">
  <Link to="/login" class="text-blue-600 hover:underline dark:text-blue-500">Already registered, then login here.</Link>
      </div>
  <button type="submit" onClick={handleclick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>

    </div>
  )
}
