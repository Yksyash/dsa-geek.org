import { useEffect,useState } from "react";
import { useParams } from "react-router-dom";

import LogoutBar from './LogoutBar';

function ViewSubmissions(){
  
    const {title} = useParams();
  
    // const encodedTitle=encodeURIComponent(title.replace(/-/g,' '));
    const queryTitle=title.replace(/-/g,' ');
  
    
  
    const[submissions,setSubmissions]=useState([]);
  
    useEffect( ()=> { const fetchSubmissions = async () =>{ await fetch(`http://localhost:3000/user/viewSubmissions/?title=${queryTitle}`,{
      headers:{
        'Authorization':localStorage.getItem('token')
      }
    })
    .then(res=>res.json())
    .then(data=>setSubmissions([...data]))
  
  
  
  }
  
    fetchSubmissions();
  
  },[]);
  
  return (
       <>
        <LogoutBar></LogoutBar>
        <div className='viewSubmissions'>
          <h2 style={{position:'sticky',top:0,backgroundColor:'slateblue'}}>Your Recent Submissions</h2>
           {submissions.map((sub,index)=><div className='Submissions'><h3>Submission {index+1}:</h3><br/><h3 style={{color:'green'}}>{sub.code}</h3></div>)}
          
        </div>
        </>
    )
   } 

   export default ViewSubmissions;