import React,{useState,useEffect} from "react";
import { useNavigate } from "react-router-dom";
import {Formik} from "formik";
import rocket_logo from "../../../public/assets/images/rocket_logo2.png"
import { Link } from "react-router-dom";
import { baseURL } from "../config/constants";




const Basic = () => {


    const [invalidMsg,setInvalidMsg]=useState(false);
    const navigate=useNavigate();


    useEffect(()=>{
      const token=localStorage.getItem("synclink_x-auth-token");
      if(token){
        navigate("home")
      }
    },[])

    if(invalidMsg==true){
        setTimeout(() => {
            setInvalidMsg(false);
        }, 1200);
    }

    function postData(data) {

    
    
      fetch(`${baseURL}/login`, {
          method: 'POST',
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      })   
      .then(response => {
          if (response.ok) {
              return response.text();
          } else {
              setInvalidMsg(true);
              return Promise.reject("Error");
          }
      })
      .then(token => {
        const temp=JSON.parse(token);
          localStorage.setItem("synclink_x-auth-token", temp?.token);
          navigate("home")
          
           
      })
      .catch(error => {
          // Handle errors here
          console.error("Error:", error);
      });
  }
  
    return (
    <div>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = 'Required';
          }
          else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          else if(values.password.length<8){
            errors.password = 'The minimum password length is 8 characters';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 400);
        const tmp=postData(values);
        setSubmitting(false);

        }}
      >
        {({ values,errors,touched,handleChange,handleBlur,handleSubmit,isSubmitting}) => (
          <form onSubmit={handleSubmit} className="flex flex-col">
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              placeholder="Email" 
              className="bg-[#3C434E] mt-[5%]  md:w-[35%] md:mt-[2.8%] sm:w-[45%] sm:mt-[3.5%] w-[50%] p-2 ml-auto mr-auto text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
            />
            <div className="text-[#FF0000] text-xs  ml-auto mr-auto">
            {errors.email && touched.email && errors.email}
            </div>
            

            
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              placeholder="Your password" 
              className=" bg-[#3C434E] mt-[5%] md:w-[35%] md:mt-[2.8%] sm:w-[45%] sm:mt-[3.5%] w-[50%] p-2 ml-auto mr-auto text-sm font-light text-white rounded-md focus:outline-none focus:bg-[#4C525F]"
            />
            <div className="text-[#FF0000] text-xs  ml-auto mr-auto">
            {errors.password && touched.password && errors.password}
            </div>
            
            {(invalidMsg)?(<span className="text-[#FF0000] text-xs  ml-auto mr-auto">Invalid username or password</span>):("")}
            <button id="buttonClicked" type="submit" disabled={isSubmitting} className="bg-[#2F353D] text-white w-auto  h-auto mt-[5%] p-2 rounded-full hover:bg-[#4C525F] hover:cursor-pointer flex ml-auto mr-auto text-sm  font-normal tracking-wide">
             <img src={rocket_logo} className=""></img>
            </button>
          </form>
        )}
      </Formik>
      
    </div>
  );}

const Login=()=>{


    return (
    <div className="flex flex-col justify-center content-center	">
   
        <span className="text-5xl mr-auto ml-auto mt-[20%] md:mt-[13%] md:text-6xl sm:mt-[17%] font-extralight text-[#FCFCFC] ">Synclink.</span>
        <Basic/>
        
        

    </div>
    )
}

export default Login;