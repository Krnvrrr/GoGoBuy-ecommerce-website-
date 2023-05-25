import React, {  useState } from "react";
import { Link } from "react-router-dom";
export default function Nav({setwhy,why}) {
  

  let handleselect=()=>{
   
    localStorage.removeItem('user')
    setwhy(why=>why+1)
  }
  let handlelogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setwhy(why=>why+1)
  }
  return (
    <>
   
<nav className="bg-white border-gray-200 dark:bg-gray-900">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-5 p-3">
  <Link href="/" className="flex items-center">
      <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" />
      <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GoGoBuy</span>
  </Link>
   
  {!localStorage.getItem('token')?<div  style={{float:'right'}} ><Link type="button" to="/login" className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Login</Link><Link to="/signup" type="button" className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br  dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Signup</Link><Link type="button" to="/" onClick={handleselect} className="text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Costumer/seller</Link></div>:<Link to="/" onClick={handlelogout}  style={{float:'right'}} type="button" className="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br  dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Logout</Link>}
  </div>
  
  
   
  
</nav>

    </>
  );
}
