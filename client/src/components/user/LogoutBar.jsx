import { useNavigate } from "react-router-dom";
import logo2 from '/src/assets/LeetCode_logo_black.png'

function LogoutBar(){

    const navigate = useNavigate();
    return ( <div className='navbar'>
      <img src={logo2} alt="Leetcode" style={{height:'80%',display:'block',objectFit:'fill' }}/>
              <div className='navbar_buttons' style={{justifyContent:'flex-end',paddingRight:'1em'}}>
                <button onClick={async (e)=>{ await fetch('http://localhost:3000/logout',{
                  method:'POST',
                  })
                  .then(res=>res.json())
                  .then(data=>{if(data.message==='Logout Successful'){
                              localStorage.removeItem('token');
                              // localStorage.removeItem('email')
                              navigate('/user/login');
                              
                              }
                            alert(data.message)
                          })
            
                  }}>Logout</button>
                  </div>
                </div>
            
            
    )
  }

  export default LogoutBar;