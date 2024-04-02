import { useState } from "react";
import { useNavigate } from "react-router-dom";


import logo from '/src/assets/Leetcode_logo.png'

function AdminLoginPage(){
       
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
      const navigate = useNavigate();
      return(
      <div className='signupPageMain'>
        <div className='logo-container'>
          <img src={logo} alt="Leetcode" id='leetcode-logo' />
        </div>
  
        <div className='signup-container'>
          <input type="text"  placeholder='E-mail' className='inputField' onChange={(e)=>setEmail(e.target.value)}/> <br/>
          <input type="text" placeholder='Password' className='inputField' onChange={(e)=>setPassword(e.target.value)}/> <br/>
      
          <button className='signupButton' onClick={async (e)=>{ await fetch('http://localhost:3000/login/admin',{
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
                          localStorage.setItem('token',data.token);
                          alert('Logged In Successfully')
                          navigate('/admin/adminDashboard')}
  
                          else{
                          alert(data.message) }                    
                        })
  
          }}>Login</button>
          <h3>Not an Admin?<button className='button' onClick={()=>navigate('/user/login')}>Login as a User</button></h3>
      
        </div>
      </div>
      )
      }
  
  

  export default AdminLoginPage;