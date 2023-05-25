import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom';
export default function CostumerHome({notification}) {
    let [items,setitems]=useState([]);
    let handlenav=async (e)=>{
      let response = await fetch(`http://127.0.0.1:5000/${e.target.name}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
          let data = await response.json();
          if (response.status === 200) {
            setitems(data);
          } else {
            alert(data.message);
          }

    }
    let addcart=async (e)=>{
       let id = e.target.id;
      
        let response = await fetch(`http://127.0.0.1:5000/costumer/addCart/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("token"),
          },
        });
        let data = await response.json();
        if (response.status === 200) {
          notification("blue",data.message)
        } else {
          alert(data.message);
        }

    }
    useEffect(() => {
        let randomm = async () => {
          let response = await fetch("http://127.0.0.1:5000/allItems", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem("token"),
            },
          });
          let data = await response.json();
          if (response.status === 200) {
            setitems(data);
          } else {
            alert(data.message);
          }
        };
        randomm();
      }, []);
  return (
    <>
    <div className=' border-2 border-black px-3 pt-3 pb-2'>
      Filter by:     
    <button type="button" onClick={handlenav} name='allItems' className="text-white ml-3 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">All products</button>
    <button type="button" onClick={handlenav} name='Domastic Product' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Domastic Product</button>
    <button type="button" onClick={handlenav} name='Electronics' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Electronics</button>
    <button type="button" onClick={handlenav} name='Clothing' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Clothing</button>
    <button type="button" onClick={handlenav} name='Cosmatics' className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Cosmatics</button>
    <Link type="button" to="/CostumerCart" style={{float:'right'}} class="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br dark:focus:ring-purple-800 font-medium rounded text-sm px-5 py-2.5 text-center mr-2 mb-2">Your Cart</Link>
    </div>
    <div className="flex flex-wrap mt-10">
          {items.length? items.map((element) => {
            return (
              <div
                key={element.id}
                className=" m-4 w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="px-5 py-8 ">
                  <div href="/">
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                      {element.product_name} - {" "}
                      {element.cetagory}
                    </h5>
                  </div>
                  <div href="/">
                    <h5 className="text-lg font-normal tracking-tight text-gray-900 dark:text-white">
                    By : {element.company_name}
                    </h5>
                  </div>
                  <div className="flex items-center mt-2.5 mb-5">
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>First star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Second star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Third star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fourth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 text-yellow-300"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>Fifth star</title>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                    <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                      {element.rating}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {element.unit_price} INR
                    </span>
                    <button
                      href="/"
                      onClick={addcart}
                      id={element.id}
                      className="text-white text-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      <i className="fa-sharp fa-solid fa-cart-plus"></i>
                    </button>
                    
                  </div>
                </div>
              </div>
            );
          }):<div className='text-center p-10'>No item of this cetagory avalible in market</div>}
        </div>
        </>
  )
}
