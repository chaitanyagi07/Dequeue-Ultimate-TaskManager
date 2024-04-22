import React from 'react'
import './Register.css'
import {useNavigate} from 'react-router-dom'
import { useState } from 'react';



export const Reg=()=>{
   const navigate=useNavigate()
   const [formData, setFormData] = useState({
        name:'',
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
          name:document.getElementById('name').value,
          email: document.getElementById('email').value,
          password: document.getElementById('password').value
       };
        const res=await fetch('http://localhost:30001/user/register',{
          method:'POST',
          headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(formData),
      });

      if(res.ok){
         navigate('/Login'); 
      }

    }
    catch(error){
      console.error(error)
    }
       
   }
  return (
    <div class="login-container" >
        <form id="login-form" onSubmit={handleSubmit}>
            <h2>Register</h2>
            <div class="form-control">
                <input type="text" id="name" name="name" placeholder='name' required onChange={handleChange}/>
            </div>
            <div class="form-control">
                <input type="text" id="email" name="email" placeholder='email' required onChange={handleChange}/>
            </div>
            <div class="form-control">
                <input type="password" id="password" name="password" required placeholder='Password' onChange={handleChange}/>
            </div>
            <button className='b1' type="submit" >Register</button>
            <p id="error-message"></p>
        </form>
       
    </div>
  )
}