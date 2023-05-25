import React from 'react'
import { useNavigate } from 'react-router-dom';
export default function Select(props) {
    let history=useNavigate();
let handleclick=(e)=>{
     e.preventDefault();
     console.log(e.target.name)
     localStorage.setItem('user',e.target.name)
     props.setuser(e.target.name)
     history('/login')
    }
  return (
    <>
    <div className=' m-4 text-center '>
          <h1 className='text-6xl font-large'>Select User options</h1>  
        </div>
    <div className='lg:flex mt-10 m-20' style={{justifyContent:'center'}}>
<div className="max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <button  >
        <img onClick={handleclick} name="Costumer" className="rounded-t-lg" src="https://unblast.com/wp-content/uploads/2021/10/Customer-Shopping-Online-Illustration.jpg" alt="User" />
    </button>
    <div className="p-5">
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Costumer</p>
        
    </div>
</div>
<div className="max-w-sm m-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <button  >
        <img onClick={handleclick} name="seller" className="rounded-t-lg" src="https://www.shutterstock.com/image-vector/fruit-seller-selling-apples-oranges-600w-795476500.jpg" alt="User" />
    </button>
    <div className="p-5">
       
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Seller</p>
        
    </div>
</div>

    </div>
    </>
  )
}
