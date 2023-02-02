import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Forms = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [message, setMessage] = useState();

  const sendData = async () => {
    if(name==""){
      toast.error(`Please Enter Name}`)
    }
   else if(email=="" || !email.includes("@")){
    toast.error(`Please Enter Email`)
    }
  else if(phone==""){
    toast.error(`Please Enter Phone`)
  }
  else{
    const res = await fetch("http://localhost:6002/register", {
      method: "POST",

      body: JSON.stringify({ name, email, phone, message }),
      headers: {
        "Content-Type": "application/json",
      },
    });
   const data =await res.json();
    console.log(data);
    
    if(data.status==201){
      toast.success("ALL DONE 🤗")
    }
   
  };

  }
   
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <div className="bg-red-300 h-[100vh] flex flex-col justify-center items-center container mx-auto">
        <div className="font-bold text-4xl">Contact US Form</div>
        <div className=" flex flex-col justify-start items-start gap-2 mt-4 ">
          <label>Enter Your Name</label>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            className="rounded w-[50vw] px-4 py-4"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col justify-start items-start gap-2 mt-4">
          <label>Enter Your Email</label>
          <input
            type="email"
            placeholder="Enter Your Name"
            required
            className="rounded w-[50vw] px-4 py-4"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col justify-start items-start gap-2 mt-4">
          <label>Enter Your Phone Number</label>
          <input
            type="text"
            placeholder="Enter Your PNumber"
            required
            className="rounded w-[50vw] px-4 py-4"
            onChange={(event) => {
              setPhone(event.target.value);
            }}
          />
        </div>
        <div className=" flex flex-col justify-start items-start gap-2 mt-4">
          <label>Enter Your Review</label>
          <textarea
            type="text"
            placeholder="Enter Your comment"
            required
            className="rounded w-[50vw] px-4 py-4"
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-4 bg-blue-500 text-white hover:bg-red-500 active:bg-slate-600 rounded"
          onClick={sendData}
        >
          Submit
        </button>
      </div>
      <ToastContainer />
    </form>
  );
};

export default Forms;
