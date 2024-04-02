import { useState,useEffect } from "react";

import Navbar from './Navbar';
import LogoutBar from './LogoutBar'
import ProblemStatement from './ProblemStatement';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};

function Home(){

    const[problemSet,setProblemSet]=useState([]);
    const[problems,setProblemsOnPage] = useState([]);
    
   useEffect(()=>
    { const fetchdata = async () =>{await fetch('http://localhost:3000/questions')
    .then(res => res.json())
    .then(jsonData => setProblemSet([...jsonData]))
  }
  fetchdata();
  
  
},[]);

const problemsPerPage = 10;
  
useEffect(()=>{setProblemsOnPage(problemSet.slice(0,10))},[problemSet]);
  
 const setOnPage = (pageNumber) =>{ 
 setProblemsOnPage(problems=>problemSet.slice(problemsPerPage*pageNumber,problemsPerPage*pageNumber+problemsPerPage));}

 const isAuthenticated=isLoggedIn();

 if(isAuthenticated){
   return (
    <div className='home'>
    <LogoutBar></LogoutBar>

    { problems.map(problem =><ProblemStatement key={problem.title.substring(0,2)}
  
  title={problem.title}
  acceptance={problem.acceptance}
  difficulty={problem.difficulty}
  />)
  
}

<div className='pagination-bar'>

{Array.from({ length: Math.ceil(problemSet.length / problemsPerPage) }).map((_, index) => (
  <button key={index} onClick={() => setOnPage(index)}>
      {index + 1}
    </button>
  ))}

</div>

  </div>
  )
 }
 
return(
<div className='home'>

 <Navbar></Navbar>

 { problems.map((problem,index) =><ProblemStatement key={index}
  
  title={problem.title}
  acceptance={problem.acceptance}
  difficulty={problem.difficulty}
  />)
  
}

<div className='pagination-bar'>

{Array.from({ length: Math.ceil(problemSet.length / problemsPerPage) }).map((_, index) => (
  <button key={index} onClick={() => setOnPage(index)}>
      {index + 1}
    </button>
  ))}

</div>


</div>
)
}

export default Home;