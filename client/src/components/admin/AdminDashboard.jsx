import { useState } from "react";

function AdminDashboard(){
   
    const[title, setTitle]=useState('');
    const[difficulty, setDifficulty]=useState('');
    const[description, setDescription]=useState('');
    const[testcases, setTestcases]=useState('');
  
    const isAuthenticated=isLoggedIn();
  
    if(isAuthenticated){
      return (
       <div className='adminDashBoardMain'>
       <LogoutBar></LogoutBar>
       <h2 id='AddQuestionText'>Add new Question Here!</h2>
       <div className='inputContainer'>
        <textarea className="addQuestion" placeholder='Title' cols={40} rows={10} onChange={(e)=>setTitle(e.target.value)}></textarea>
        <textarea className="addQuestion" placeholder='Difficulty' cols={40} rows={10} onChange={(e)=>setDifficulty(e.target.value)}></textarea>
        <textarea className="addQuestion" placeholder='Description' cols={40} rows={10} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <textarea className="addQuestion" placeholder='Testcases' cols={40} rows={10} onChange={(e)=>setTestcases(e.target.value)}></textarea>
        </div>
        <button id='AddQuestionButton'  onClick={async (e)=> { await fetch('http://localhost:3000/admin/addQuestions',{
          method:'POST',
          headers:{
            'Content-Type': 'application/json',
            'Authorization':localStorage.getItem('token')
          },
          body:JSON.stringify({
            title:title,
            difficulty:difficulty,
            description:description,
            testcases:testcases
  
          })
        })
        .then(res=>res.json())
        .then(data=>{if(data.message==='Question Added'){
                      alert('Question Added')
                    }
                    else{alert(data.message)}
                    })
  
        }}>Add Question</button>
        </div>
       
      )
    }
        return (
        <div className='adminDashBoardMain'>
        
        <Navbar></Navbar>
        <h2 id='AddQuestionText'>Add new Question Here!</h2>
        <div className='inputContainer'>
        <textarea className="addQuestion" placeholder='title' cols={40} rows={10} onChange={(e)=>setTitle(e.target.value)}></textarea>
        <textarea className="addQuestion"  placeholder='Description' cols={40} rows={10} onChange={(e)=>setDescription(e.target.value)}></textarea>
        <textarea className="addQuestion"  placeholder='Testcases' cols={40} rows={10} onChange={(e)=>setTestcases(e.target.value)}></textarea>
        </div>
  
        <button id='AddQuestionButton' onClick={()=>{alert('You need to Login to add questions!')}}>Add Question</button>
        
  
        </div>
       )
  
  
  }

  export default AdminDashboard;