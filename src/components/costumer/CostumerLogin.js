import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
export default function CostumerLogin({why,setwhy,notification}) {
  let history=useNavigate();
  let [user,setuser]=useState({email:"",password:""})
  let onchange = (e)=>{
    setuser({...user,[e.target.name]:e.target.value})
  }
  let handleclick = async (e)=>{
    e.preventDefault();
    let {email,password}=user;
    console.log(email,password)
    let response = await fetch("http://127.0.0.1:5000/costumer/Login", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email, password}),
  })
  let data =await response.json();
  if(response.status===200){
     localStorage.setItem('token',data.token);
     notification("blue",`you are succesfully logged in as ${data.name}`)
     setwhy(why=>why+1)
     history('/home')
  }
  else {
    alert(data.message)
  }
}
  return (
    <div className='md:flex m-6'>
    <div className=' m-6  '>
          <h1 className='text-6xl font-thin'>GoGoBuy</h1>  
          <h1 className='text-4xl font-thin'>Costumer</h1>
        </div>
  
<form className=" md:w-3/4 h-screen">

<div className=" mb-6">
<label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
<input type="email" id="email" onChange={onchange} name='email' value={user.email} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="name@flowbite.com" required/>
</div>
<div className="mb-6">
<label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Your password</label>
<input type="password" id="password" onChange={onchange} name='password' value={user.password} className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required/>
</div>
<div className="flex items-start mb-6">
  </div>
<button type="submit" onClick={handleclick} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register new account</button>
</form>

</div>
  )
}
