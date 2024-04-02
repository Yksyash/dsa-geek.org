import { useState,useEffect,useRef } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { Editor } from '@monaco-editor/react';
import Collapsible from 'react-collapsible';

import LogoutBar from './LogoutBar';
import Navbar from './Navbar';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};

 function SubmitSolution(){
    const {title} = useParams();
    const queryTitle=title.replace(/-/g,' ');
    const[description,setDescription]=useState('');
    const [loading, setLoading] = useState(false);
    const[testcases,setTestcases]=useState([" \n "," \n "," \n"]);
    const[currentTestcase,setCurrenTestcase]=useState(testcases[0]);
    const[functions,setFunctions]=useState('');
    const[isExpanded, setIsExpanded]=useState(false);
    const[isOpen,setIsOpen]=useState(false);
    const[testError,setTestError]=useState('');
    const[testResults,setTestResults]=useState([{Expected:' ',Actual:' '},{Expected:' ',Actual:' '}]);
    const[currentTest, setCurrenTest]=useState(testResults[0]);
    const navigate=useNavigate();
    const a='>';
    const editorRef=useRef(null)
    function handleEditorMount(editor,monaco){
      editorRef.current=editor;
    }

    const[codeLanguage,setLanguage]=useState('javascript');
    const[code,setCode]=useState('');
    
    
    useEffect(()=>{
      
      const fetchProblemDetails = async () => { await fetch(`http://localhost:3000/questions/?title=${queryTitle}`,
      {headers:{
        'Content-Type':'application/json'
      }})
      .then(res=>res.json())
      .then(data=>{setDescription(data.description);
        setTestcases(data.testcases);
        setFunctions(data.functions);
      })}
      
      fetchProblemDetails();
      
      
    },[]);
    
    useEffect(()=>setCode(functions.javascript),[functions]);
    useEffect(()=>{setCode(functions[codeLanguage]);setTestResults([{Expected:' ',Actual:' '},{Expected:' ',Actual:' '}])},[codeLanguage]);
    useEffect(()=>{if(testResults[0].Expected==' '){return;}setTestError(null);setCurrenTest(testResults[0]);setIsOpen(true);setIsExpanded(true)},[testResults]);
    useEffect(()=>{setCurrenTestcase(testcases[0])},[testcases]);
    useEffect(()=>{if(testError==''){return;}setIsOpen(true);setIsExpanded(true);},[testError]);

  
     if(isLoggedIn()){
      return(
        <div className='submitSolutionMain'>

        
       <LogoutBar></LogoutBar>

      <div className='description'>
       <h2>{title}</h2>

       <p style={{textAlign:'left', marginLeft:'1em',}}>Description: <br /> {description}</p> 
       
       <p style={{position:'absolute',left:'1em',textAlign:'left',whiteSpace:'pre-line'}}>Examples:</p> <br /><br />

       {testcases.map((testcase,index)=><p style={{marginLeft:'1em',textAlign:'left',whiteSpace:'pre-line'}} key={index}>{index+1}. Input:&nbsp;{testcase.split('\n')[0]} &nbsp;&nbsp;&nbsp; Output:&nbsp;{  testcase.split('\n')[1]}</p>)}
    
       </div> 
      <div className='language-dropdown'>
        <select className='dropdown' value={codeLanguage} onChange={(e)=>setLanguage(e.target.value)}>
        <option >javascript</option>
        <option >cpp</option>
        <option  >python</option>
        <option >java</option>
       </select>
      <button id='MySubmissions' onClick={()=>navigate(`/user/viewSubmissions/${title}`)}>My Submissions</button>
      </div>

      <div className='solution' style={{height:isExpanded?'28%':'64%'}}>
        <Editor
          defaultLanguage='javascript'
          language={codeLanguage}
          value={code}
          theme='vs-dark'
          options={
          {minimap:
          {enabled:false},
          contextmenu:false
          }
          }

          onMount={handleEditorMount}

          onChange={()=>{setCode(editorRef.current.getValue())}}

          height={'89%'}
          
        />
        <div className='submit-bar'>
        <button id='run-button' disabled={loading} onClick={async(e)=>{ 

          setLoading(true);
          
          //send code execution request 
          await fetch ('http://localhost:3000/user/run-code',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token')

          },
          body:JSON.stringify({
            title:queryTitle,
            language:codeLanguage,
            code:code
          })
         })
         .then(res=>res.json())
         .then(data=>{if(data.Error){setTestError(data.Error);setLoading(false)}
                       else {setTestResults(data);setLoading(false)}
                      })            
        
              }}>{loading ? <div className="spinner"></div> : 'Run'}</button>

        <button id='submit-button' onClick={async(e)=>{ await fetch('http://localhost:3000/user/submit',{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'Authorization':localStorage.getItem('token')
          },
          body:JSON.stringify({
            code:code,
            title:queryTitle
          })
        })
        .then(res=>res.json())
        .then(data=>alert(data.message))
        }}>Submit</button>
      </div>
      </div> 
        
     { testError && (<Collapsible  open={isOpen} trigger={<button>testcases {a} </button>} triggerWhenOpen={<button>testcases</button>} onOpening={()=>{setIsExpanded(true)}} onClosing={()=>{setIsExpanded(false);setIsOpen(false)}} overflowWhenOpen='auto' transitionTime={50} >
                        <p style={{whiteSpace:'pre-line',maxHeight:'100%'}}>{testError}</p>        
                      </Collapsible>)}

      { !testError && (<Collapsible  open={isOpen} trigger={<button>testcases {a} </button>} triggerWhenOpen={<button>testcases</button>} onOpening={()=>{setIsExpanded(true)}} onClosing={()=>{setIsExpanded(false);setIsOpen(false)}} overflowWhenOpen='auto' transitionTime={50}>
                              <div className='testResults_buttons' style={{display:'flex',justifyContent:'space-around', maxHeight:'70%', marginTop:'0.5em', overflow:'inherit'}}>
                                {testResults.map((_,index)=><button style={{border:((testResults[index].Expected && testResults[index].Expected==testResults[index].Actual ) || ( testResults[index].expected_output && testResults[index].expected_output==testResults[index].actual_output)  ||  (testResults[index].expectedOutput && testResults[index].expectedOutput==testResults[index].actualOutput))?'1.5px solid green':'1.5px solid red'}} onClick={()=>{setCurrenTest(testResults[index]);setCurrenTestcase(testcases[index])}} key={index+1}>testcase {index+1}</button>)}        
                              </div>
                              <div className='testResults_data' style={{display:'flex',flexDirection:'column',alignItems:'flex-start', marginLeft:'0.5em',maxHeight:'100%', marginTop:'0.5em'}}>
                                <h5>Input:</h5>
                                <div className='testResults_inner' contentEditable={false}>{currentTestcase.split('\n')[0]}</div>
                                <h5>Expected Output:</h5>
                                <div className='testResults_inner' contentEditable={false} >{currentTest.Expected || currentTest.expected_output || currentTest.expectedOutput}</div>
                                <h5>Your Output:</h5>
                                <div className='testResults_inner' contentEditable={false}  style={{border:((currentTest.Expected && currentTest.Expected==currentTest.Actual ) || ( currentTest.expected_output && currentTest.expected_output==currentTest.actual_output)  ||  ( currentTest.expectedOutput && currentTest.expectedOutput==currentTest.actualOutput))?'1.5px solid green':' 1.5px solid red'}} >{currentTest.Actual || currentTest.actual_output || currentTest.actualOutput }                             
                                </div>
                              </div>
                        </Collapsible>)}

      </div>
    )
  }
    return(
      <div className='submitSolutionMain'>

        
       <Navbar></Navbar>

      <div className='description'>
      <h2>{title}</h2>

<p style={{textAlign:'left', marginLeft:'1em',}}>Description: <br /> {description}</p> 

<p style={{position:'absolute',left:'1em',textAlign:'left',whiteSpace:'pre-line'}}>Examples:</p> <br /><br />

{testcases.map((testcase,index)=><p style={{marginLeft:'1em',textAlign:'left',whiteSpace:'pre-line'}} key={index}>{index+1}. Input:&nbsp;{testcase.split('\n')[0]} &nbsp;&nbsp;&nbsp; Output:&nbsp;{  testcase.split('\n')[1]}</p>)}

    
      </div>
      <div className='language-dropdown'>
        <select className='dropdown' value={codeLanguage} onChange={(e)=>setLanguage(e.target.value)}>
        <option >javascript</option>
        <option >cpp</option>
        <option  >python</option>
        <option >java</option>
      </select>
      <button id='MySubmissions' onClick={()=>alert('please sign in to view your submissions!')}>My Submissions</button>
      </div>

      <div className='solution' style={{height:isExpanded?'37%':'65%'}}>
        <Editor
        defaultLanguage='javascript'
          language={codeLanguage}
          value={code}
          theme='vs-dark'
          options={
          {minimap:
          {enabled:false},
          contextmenu:false
          }
          }
          onMount={handleEditorMount}

          onChange={()=>{setCode(editorRef.current.getValue())}}
          height={'89%'}
             />
      
      <div className='submit-bar'>
        <button id='run-button' onClick={()=>alert('please login to run/submit code!')}>Run</button>
        <button id='submit-button'onClick={()=>alert('please login to run/submit code!')}>Submit</button>
      </div>
      </div>

      <Collapsible  trigger={<button>testcases {a} </button>} triggerWhenOpen={<button>testcases</button>} onOpening={()=>{setIsExpanded(true)}} onClosing={()=>{setIsExpanded(false)}} overflowWhenOpen='hidden' transitionTime={50}>
       <div style={{height:'25%', display:'flex', alignItems:'center',justifyContent:'center',marginTop:'4em',marginBottom:'4em',overflow:'hidden'}} >
            You need to run code to view this data!
       </div>
      </Collapsible>

      </div>

      
    )
  }

  export default SubmitSolution;