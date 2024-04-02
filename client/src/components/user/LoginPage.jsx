import { useState } from "react";
import { useNavigate } from "react-router-dom";


import logo from '/src/assets/Leetcode_logo.png'



function LoginPage(){

    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
    
    const navigate = useNavigate();
  
  
    return(
    <div className='signupPageMain'>
      <div className='logo-container'>
        <img src={logo} alt="Leetcode" id='leetcode-logo' />
      </div>
      <div className='signup-container'>
        <input type="text"  placeholder='E-mail' className='inputField' onChange={(e)=>setEmail(e.target.value)}/><br />
        <input type="text" placeholder='Password' className='inputField' onChange={(e)=>setPassword(e.target.value)}/> <br />
        <button className='signupButton' onClick={async (e) => { await fetch('http://localhost:3000/user/login',{
            method:'POST',
            headers: {
              'Content-Type': 'application/json',
            }, 
            body:JSON.stringify({
              email:email,
              password:password
            })
          
          })
          .then(res=>res.json())
          .then(data=>{if(data.token){
                        localStorage.setItem('token',data.token)
                        alert('Logged In Successfully')
                        navigate('/')
                          }
                         else {
                        alert(data.message)}
          })
        }}>Login</button>
        <h3>Don't have an account?</h3><button className='button' onClick={()=>navigate('/user/signup')}>Signup</button>
  
         <h3>Want to login as an Admin?<button className='button' onClick={()=>navigate('/login/admin')}>Login as Admin</button></h3>
    
      </div>
  
    </div>
    )
  }

  export default LoginPage;
  
  