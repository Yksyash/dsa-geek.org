import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../user/Navbar';
import Alert from '@mui/material/Alert';
import Logo from '/src/assets/logo.png'
import { Button } from "@mui/material";

function AdminLoginPage(){
    const [alert,setAlert] = useState(false);
    const [alertContent,setAlertContent] = useState(true);   
    const [email,setEmail] = useState('');
    const [password,setPassword]=useState('');
      const navigate = useNavigate();
      return(
        <>
        <Navbar></Navbar>
        <section class='tw-flex tw-justify-center tw-items-center tw-h-full'>
        {alert ? (<Alert severity="error" sx={{position:'fixed', top:'0', width:'100%'}}>{alertContent}</Alert>) : (<></>) }
        <div class='tw-w-1/2 tw-h-2/3 sm:tw-w-2/5 md:tw-w-1/3 lg:tw-w-1/4 sm:tw-h-4/5 tw-border tw-border-gray-500 tw-rounded-lg'>
          <div class='tw-grid tw-grid-cols-5 tw-bg-[#393737] tw-rounded-t-lg'>
            <div class='tw-col-span-2 tw-my-2 tw-w-8 tw-place-self-end'>
            <img src={Logo} alt="Logo" class='tw-object-cover tw-max-h-full '/>
            </div>
            <h1 class='tw-col-span-3 tw-my-auto tw-text-xl '>dsaGeek</h1>
          </div>
          <div class=' tw-flex tw-flex-col tw-my-2 tw-items-center tw-gap-2 tw-mt-4'>
            <input class='tw-border-gray-500 tw-border tw-mt-4 tw-rounded-lg tw-font-light tw-p-2'  type="text" placeholder='E-mail' onChange={(e) => setEmail(e.target.value)} />
            <input class='tw-border-gray-500 tw-border tw-mt-4 tw-rounded-lg tw-p-2 ' type="text" placeholder='Password'  onChange={(e) => setPassword(e.target.value)} /> <br />
            <Button variant="contained" color="success" onClick={async (e) => {
              try{
              await fetch('http://localhost:3000/admin/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email: email,
                  password: password
                })
  
              })
              .then(res=>{if(res.status==411){
                alert('please ensure your credentials are in correct fornat!')  
               }else{res.json()}
              })
              .then(data=>{if(data.token){
                            localStorage.setItem('token',data.token);
                            <Alert severity="success">Logged In Successfully</Alert>
                            navigate('/admin/adminDashboard')}
    
                            else{
                              setAlertContent(data.message);
                              setAlert(true); 
                            }                    
                          })}
                             catch(e){
                              setAlertContent('Unknown Network Error');
                              setAlert(true);
                             }
            }}>Login</Button>
            <h3>Not An Admin?<Button  variant="text"  onClick={() => navigate('/user/signup')}>Login as User</Button></h3>
            
  
          </div>
        </div>
  
      </section>
      </>
      )
      }
  
  

  export default AdminLoginPage;