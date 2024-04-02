import { useNavigate } from 'react-router-dom';
import logo2 from '/src/assets/LeetCode_logo_black.png'

function Navbar(){

    const navigate = useNavigate();
    return (
          <div className='navbar'>
            <img src={logo2} alt="Leetcode" style={{height:'80%',display:'block',objectFit:'fill'}}/>
            <div className='navbar_buttons'>
            <button onClick={()=>navigate('/user/signup')}>Signup</button>
            <h3> Or</h3>
            <button onClick={()=>navigate('/user/login')}>Login</button>
            </div>
          </div>
  
    )
  }

  export default Navbar;