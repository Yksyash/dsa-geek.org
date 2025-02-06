import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Typography } from "@mui/material";
import Navbar from './Navbar';

import Logo from '/src/assets/logo.png'



function LoginPage() {
  const [alert,setAlert] = useState(false);
  const [alertContent,setAlertContent] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [severity,setSeverity]=useState("info");


  const navigate = useNavigate();


  return (
    <>
    <Navbar></Navbar>
    <section class='tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full'>
      {alert ? (<Alert severity={severity} sx={{position:'fixed', top:'0', width:'100%'}}>{alertContent}</Alert>) : (<></>) }
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
              await fetch('http://localhost:3000/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password
              })

            })
              .then(res => res.json())
              .then(data => {
                if (data.token) {
                  localStorage.setItem('token', data.token);
                  navigate('/')
                }
                else {
                  setAlertContent(data.message);
                  setSeverity("error");
                  setAlert(true);
                  // setTimeout(()=>setAlert(false),3000)
                }
              })}
              catch(e){
                setAlertContent('Unknown Network Error');
                setSeverity("error");
               setAlert(true);
              }
          }}>Login</Button> 
          <h3>Don't have an account?<Button  variant="text"  onClick={() => navigate('/user/signup')}>Signup</Button></h3>
          <h4>Or</h4>
          <Button  variant="text" sx={{textTransform:'none'}}  onClick={() => navigate('/login/admin')}>Click Here For Admin Access</Button>

        </div>
      </div>

    </section>
    </>
  )
}

export default LoginPage;

