import React, { useEffect, useState } from "react";

export default function CostumerCart({notification}) {
    let [cartitem,setcartitem]=useState([]);
    let removecart=async (e)=>{
        e.preventDefault();
        let response = await fetch(`http://127.0.0.1:5000/costumer/removeCart/${e.target.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        }
      });
      let data = await response.json();
      if (response.status === 200) {
        notification("red",data.message)
      } else {
        alert(data.message);
      }

    }
  useEffect(() => {
    let cart = async () => {
      let response = await fetch("http://127.0.0.1:5000/costumer/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        
      });
      let data = await response.json();
      if (response.status === 200) {
        setcartitem(data)
      } else {
        alert(data.message);
      }
    };
    cart();
  },[]);
  return (
    <div>
        <i class="fa-regular fa-cart-circle-xmark"></i>
    {cartitem.map((element) => {
        return (
          <div
            key={element.id}
            className=" m-10      bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
                quantity : {element.quantity}
                </h5>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">
                  {element.unit_price} INR
                </span>
                <button
                type="button"
                  onClick={removecart}
                  id={element.id}
                  className="text-white text-sm bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                 <i class="fa-regular fa-cart-circle-xmark"></i>  remove single unit from cart
                </button>
                
              </div>
            </div>
          </div>
        );
      })}
      </div>
  )
}
