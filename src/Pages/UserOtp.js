import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';



const UserOtp = () => {
  const [otp,setOtp]=useState('');

  const location =useLocation();
  console.log(location);

  const navigate=useNavigate();

  const LoginUser=async(e)=>{
    e.preventDefault();
  
    if(otp===''){
      toast.error("Please Enter Your Code...");

    }else if(!/[^a-zA-Z]/.test(otp)){
      toast.error("Please Enter Valid Otp")
    }else if(otp.length<6){
      toast.error("Please Enter 6 digit code received")
    }else{
      const response = await fetch('http://localhost:8080/userverify',{
        method:'post',
        body:JSON.stringify({otp,email:location.state}),
        headers:{
          'Content-Type':'application/json'
        }
      })
        if(response.status===200){
          const data=await response.json();
          localStorage.setItem("usertoken",data.token)
          toast.success(data.message);
          setTimeout(()=>{
            navigate('/dashboard')

          },3000)
        }
        else{
          const errorData=await response.json();
          toast.error(errorData.error);
        }

    }

  }

  return (
    <>
       <section>
                <div className='form-data'>
                    <div className='heading'>
                        <h1>Verify your Code Here!!</h1>

                    </div>
                    <form>
                        <div className='form-input'>
                            <lable htmlFor='otp'>OTP</lable>
                            <input type='text' placeholder='Enter your Code' onChange={(e) => setOtp(e.target.value)}></input>
                        </div>
                        <button className='btn' onClick={LoginUser}>Submit</button>
                       
                    </form>
                </div>
                <ToastContainer/>
               
            </section>
    </>
  )
}

export default UserOtp