import React from 'react'
import './Log.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';



export const Log=()=>{
   const navigate=useNavigate()
   const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
   const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData(prevState => ({
         ...prevState,
         [name]: value
      }));
    };

   const handleSubmit= async (event)=>{
    event.preventDefault(); 
      try{
        const formData = {
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
       };
        const res=await fetch('http://localhost:30001/user/login',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if(res.ok){
        const data = await res.json();
        const token = data.token;
        window.localStorage.setItem("usertoken",token)
         navigate('/'); 
      }

    }
    catch(error){
      console.error(error)
    }
       
   }
  return (
    <div class="login-container">
        <form id="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div class="form-control">
                <input type="text" id="email" name="email" placeholder='email' required onChange={handleChange}/>
            </div>
            <div class="form-control">
                <input type="password" id="password" name="password" required placeholder='Password' onChange={handleChange}/>
            </div>
            <button className='b1' type="submit" >Login</button>
            <p id="error-message"></p>
            <p onClick={()=>navigate('/register')}>Don't have account ?</p>
        </form>
     
    </div>
  )
}