import React from "react";
import "../style/login.css";
import { Input } from "antd";
import { Link } from "react-router-dom";

function SignUp(){
    return(
        <>
          <div className="grid grid-cols-2">
       <div className="back">

       </div>

       <div className="">

        <div className="">
            <img></img>
            <form  className="mt-[6rem]  ml-[10rem] ">
            <p className="text-sm mt-5 text-gray-500 font-light">Recuriter Login</p>
            <Input className="w-[20rem] mt-5" type="text" placeholder="First Name"></Input>
            <Input className="w-[20rem] mt-5" type="text" placeholder="Last Name"></Input>
            <Input className="w-[20rem] mt-5" type="number" placeholder="Mobile Number"></Input>
            <Input className="w-[20rem] mt-5" type="email" id="ema" placeholder="Email"></Input>
            <Input.Password className="w-[20rem] mt-5" placeholder="Enter Your Password"></Input.Password>
            <Input.Password className="w-[20rem] mt-5" placeholder="Confirm Password"></Input.Password>
            <p className="text-blue-500 mt-5 text-sm font-extralight"> Forget your Passowrd ?</p>
            <button type="submit" className=" mt-8 w-[20rem] h-[2rem] rounded-md text-center bg-blue-500 text-white text-sm ">Sign up</button>
            <div>
                <p className="text-black text-sm font-light">Already have an Account</p>
             <Link to={"/"}>  <p className="text-blue-500 text-sm font-light">Login</p></Link> 
            </div>
            </form>
        </div>

       </div>


        </div>
        </>
    )
}

export default SignUp;