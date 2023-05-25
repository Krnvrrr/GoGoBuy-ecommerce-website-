import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function AddProduct({notification}) {
  let history = useNavigate();
  let [values, setvalues] = useState({
    product_name: "",
    unit_price: "",
    cetagory: "",
  });
  let onchange = (e) => {
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  let handleclick = async (e) => {
    e.preventDefault();
    console.log(values);
    let { product_name, unit_price, cetagory } = values;
    let response = await fetch("http://127.0.0.1:5000/addItem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ product_name, unit_price, cetagory }),
    });
    let data = await response.json();
    if (response.status === 200) {
      notification("blue",data.message)
      history("/home");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="text-center">
      <h1 className="text-4xl m-6 font-thin">Product Info</h1>
      <div className="flex" style={{ justifyContent: "center" }}>
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6">
            <div className="relative">
              <input
                name="product_name"
                onChange={onchange}
                value={values.product_name}
                type="text"
                id="floating_filled"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Product Name
              </label>
            </div>
            <div className="relative">
              <input
                name="unit_price"
                onChange={onchange}
                value={values.unit_price}
                type="text"
                id="floating_filled"
                className="block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-900 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                placeholder=" "
              />
              <label
                htmlFor="floating_filled"
                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4"
              >
                Price of one unit
              </label>
            </div>

            <select
              name="cetagory"
              onChange={onchange}
              value={values.cetagory}
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Select Cetagory</option>
              <option value="UDomastic ProductS">Domastic Product</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Cosmatics">Cosmatics</option>
            </select>

            <button
              onClick={handleclick}
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
