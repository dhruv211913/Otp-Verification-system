import React, { useState } from 'react'
import '../Styles/mix.css';
import { toast, ToastContainer } from 'react-toastify';
import { NavLink, useNavigate } from 'react-router-dom';

const Register = () => {
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();

    const handledata=async (e)=>{
        e.preventDefault();
        console.warn(name,email,password)
        if(name===""){
            toast.error("Please Enter Your Name")
        }else if(email===""){
            toast.error("Please Enter Your Email")
        }else if(!email.includes("@")){
            toast.error("Please Enter valid Email")
        }else if(password===""){
            toast.error("Please Enter your password")
        }else if(password.length<5){
            toast.error("Password length should be minimum 5 characters")
        }else{
            
            try {
                const response = await fetch('http://localhost:8080/register', {
                    method: 'POST',
                    body: JSON.stringify({ name, email, password }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Registration failed');
                }
                const result = await response.json();
                console.warn(result);
                toast.success("Registration successful");
                navigate('/')

            } catch (error) {
                console.error(error);
                toast.error("Registration failed. Please try again.");
            }
        }
    }


  return (
    <>
     <section>
                <div className='form-data'>
                    <div className='heading'>
                        <h1>Register Here</h1>

                    </div>
                    <form>
                        <div className='form-input'>
                            <lable htmlFor='name'>Name</lable>
                            <input type='type' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}></input>
                        </div>
                        <div className='form-input'>
                            <lable htmlFor='email'>Email</lable>
                            <input type='text' placeholder='Enter your E-mail' onChange={(e)=>setEmail(e.target.value)}></input>
                        </div> <div className='form-input'>
                            <lable htmlFor='password'>Password</lable>
                            <input type='password' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}></input>
                        </div>
                        <button className='btn'  onClick={handledata}>Register</button>
                        <p className='register-link'>Already have an Account? <NavLink to='/'>Login</NavLink></p>
                    </form>
                </div>
                <ToastContainer />
            </section>
    </>
  )
}

export default Register