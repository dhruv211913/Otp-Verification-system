import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import '../Styles/mix.css';
import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate(); // Call useNavigate inside the component body

    const sendotp = async (e) => {
        e.preventDefault();
        if (email === "") {
            toast.error("Please Enter Your Email...");
        } else if (!email.includes("@")) {
            toast.error("Please Enter Valid Email..");
        } else {
            try {
                const response = await fetch('http://localhost:8080/sendotp', {
                    method: 'post',
                    body: JSON.stringify({ email }),
                    headers: {
                        'Content-type': 'application/json'
                    }
                });
                if (!response.ok) {
                    const errorData = await response.json();
                    if (errorData.error === "User Not Found") {
                        toast.error("User Not Found")
                        // Navigate to the register page
                        window.location.href = "/register";
                        return; // Stop execution after navigating
                    }
                    throw new Error('Failed to send otp. Please try again later');
                }
                if (response.status === 200) {
                   toast.success("OTP Sent Successfully")
                   setTimeout(()=>{
                    navigate('/otp',{state:email})

                   },5000)
                   
                }

            } catch (error) {
                console.error(error);
            }
        }
    }
    
    return (
        <>
            <section>
                <div className='form-data'>
                    <div className='heading'>
                        <h1>Welcome, Log In</h1>

                    </div>
                    <form>
                        <div className='form-input'>
                            <lable htmlFor='email'>Email</lable>
                            <input type='text' placeholder='Enter your E-mail' onChange={(e) => setEmail(e.target.value)}></input>
                        </div>
                        <button className='btn' onClick={sendotp}>Login</button>
                        <p className='register-link'>Don't have an account? <NavLink to='/register'>Sign Up</NavLink></p>
                    </form>
                </div>
                <ToastContainer />
            </section>
        </>
    )
}

export default Login