import { useState } from "react";
import { useNavigate } from "react-router-dom";


import logo from '/src/assets/Leetcode_logo.png'

function SignupPage(){
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState(''); 
  
    const navigate = useNavigate();
  return(
  <div className='signupPageMain'>
    <div className='logo-container'>
      <img src={logo} alt="Leetcode" id='leetcode-logo' />
    </div>
    <div className='signup-container'>
      <input type="text" placeholder='Username' className='inputField' onChange={(e) =>setUsername(e.target.value)}/><br/> 
      <input type="text"  placeholder='E-mail' className='inputField' onChange={(e) =>setEmail(e.target.value)}/> <br/>
      <input type="text" placeholder='Password' className='inputField' onChange={(e) =>setPassword(e.target.value)}/> 
      <br/>
      <button className='signupButton' 
      onClick={
        async (e)=>{
        const response = await fetch("http://localhost:3000/user/signup",{
          method:"POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body:JSON.stringify({
            username:username,
            email:email,
            password:password,
  
          })
  
        })
        .then(res=>res.json())
        .then(msg=>alert(msg.message))
        
  
      }}>Signup</button>
  
      
  
      <h3>Existing User?<button className='button'  onClick={()=>navigate('/user/login')}>Login</button></h3>
    </div>
  
  </div>
  )
  }

  export default SignupPage;