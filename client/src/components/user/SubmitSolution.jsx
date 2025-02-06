import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Editor } from '@monaco-editor/react';
import { Button } from "@mui/material";
import Collapsible from 'react-collapsible';
import { Alert } from '@mui/material';


import Navbar from './Navbar';

const isLoggedIn = () => {
  const token = localStorage.getItem('token');
  return !!token; // Returns true if the token is present
};

function SubmitSolution() {
  const { title } = useParams();
  const queryTitle = title.replace(/-/g, ' ');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [testcases, setTestcases] = useState([" \n ", " \n ", " \n"]);
  const [currentTestcase, setCurrenTestcase] = useState(testcases[0]);
  const [functions, setFunctions] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [testError, setTestError] = useState('');
  const [testResults, setTestResults] = useState([{ Expected: ' ', Actual: ' ' }, { Expected: ' ', Actual: ' ' }]);
  const [currentTest, setCurrenTest] = useState(testResults[0]);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();
  const a = '>';
  const editorRef = useRef(null)
  function handleEditorMount(editor, monaco) {
    editorRef.current = editor;
  }

  const [codeLanguage, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');


  useEffect(() => {

    const fetchProblemDetails = async () => {
      await fetch(`http://localhost:3000/questions/?title=${queryTitle}`,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          setDescription(data.description);
          setTestcases(data.testcases);
          setFunctions(data.functions);
        })
    }

    fetchProblemDetails();


  }, []);

  useEffect(() => setCode(functions.javascript), [functions]);
  useEffect(() => { setCode(functions[codeLanguage]); setTestResults([{ Expected: ' ', Actual: ' ' }, { Expected: ' ', Actual: ' ' }]) }, [codeLanguage]);
  useEffect(() => { if (testResults[0].Expected == ' ') { return; } setTestError(null); setCurrenTest(testResults[0]); setIsOpen(true); setIsExpanded(true) }, [testResults]);
  useEffect(() => { setCurrenTestcase(testcases[0]) }, [testcases]);
  useEffect(() => { if (testError == '') { return; } setIsOpen(true); setIsExpanded(true); }, [testError]);
  
  const handleRun = async(e) => { if(isLoggedIn()) {  

     setLoading(true);

    //send code execution request 
    await fetch('http://localhost:3000/user/run-code', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')

      },
      body: JSON.stringify({
        title: queryTitle,
        language: codeLanguage,
        code: code
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.Error) { setTestError(data.Error); setLoading(false) }
        else { setTestResults(data); setLoading(false) }
      })

    } else
         { setAlert(true);
          setTimeout(()=>setAlert(false),5000);
         }

      }      

  const handleSubmit = async(e) =>{ if(isLoggedIn())  {

    await fetch('http://localhost:3000/user/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('token')
      },
      body: JSON.stringify({
        code: code,
        title: queryTitle
      })
    })
      .then(res => res.json())
      .then(data => alert(data.message))

  } else { setAlert(true);
           setTimeout(()=>setAlert(false),5000);
         }

  }

  return (
    <section class='tw-h-full'>
      <Navbar/>

      <div class='tw-mx-2 tw-py-2 tw-grid tw-gap-2 sm:tw-grid-cols-2 tw-h-[90%]'>
      
      {alert ? (<Alert severity="error" sx={{position:'fixed', top:'0', width:'100%'}}>Please login in order to record your submissions</Alert>) : (<></>) }

        <div class='tw-grid tw-gap-4 tw-p-4 tw-border-gray-500 tw-rounded tw-border '>
          <h2 class='tw-font-medium tw-text-3xl'>{title}</h2>

          <p class='tw-text-gray-300'> {description}</p>

          {testcases.map((testcase, index) => <div class='tw-font-medium' key={index}>Example {index + 1} :
            <div class='tw-px-4 tw-py-4'>
              Input <br />
              <p class='tw-text-gray-400'>{testcase.split('\n')[0]}</p>
              Output <br />
              <p class='tw-text-gray-400'>{testcase.split('\n')[1]}</p>
            </div>

          </div>)}

        </div>

        <div class='tw-relative tw-flex tw-flex-col tw-justify-between tw-border-gray-500 tw-border tw-rounded'>
          <div class='tw-flex tw-justify-between tw-p-2 tw-bg-stone-600 tw-rounded tw-basis-1/12'>
            <select class='tw-pb-1 tw-bg-stone-600 tw-border-gray-400 tw-border tw-rounded-md tw-text-sm tw-text-gray-100' value={codeLanguage} onChange={(e) => setLanguage(e.target.value)}>
              <option class=' focus:tw-bg-red-500 '>javascript</option>
              <option >cpp</option>
              <option >python</option>
              <option >java</option>
            </select>
            <button class='tw-bg-green-600 hover:tw-bg-green-700 tw-basis-1/6 tw-rounded tw-px-2 tw-py-1' onClick={() => navigate(`/user/viewSubmissions/${title}`)}>Submissions</button>
          </div>

          <div class='tw-basis-10/12'>
            <Editor
              defaultLanguage='javascript'
              language={codeLanguage}
              value={code}
              theme='vs-dark'
              options={
                {
                  minimap:
                    { enabled: false },
                  contextmenu: false
                }
              }

              onMount={handleEditorMount}

              onChange={() => { setCode(editorRef.current.getValue()) }}

              height={'80%'}
              width={'99%'}

            />
            <div class='tw-flex tw-justify-end tw-gap-4 tw-p-2 tw-border-gray-500 tw-border tw-rounded tw-m-1'>
              <button class='tw-bg-green-600 hover:tw-bg-green-800 tw-basis-1/6 tw-rounded tw-py-1' disabled={loading} onClick={handleRun}>{loading ? <div class=''></div> : 'Run'}</button>

              <button class='tw-bg-indigo-500 hover:tw-bg-indigo-700 tw-basis-1/6 tw-rounded' onClick={handleSubmit}>Submit</button>
            </div>
          </div>


          <div class='tw-p-2 tw-m-1 tw-border-gray-500 tw-border tw-rounded tw-basis-1/12'>
            {testError && (<Collapsible open={isOpen} trigger={<button>testcases {a} </button>} triggerWhenOpen={<button>testcases</button>} onOpening={() => { setIsExpanded(true) }} onClosing={() => { setIsExpanded(false); setIsOpen(false) }} overflowWhenOpen='auto' transitionTime={50} >
              <p class='tw-whitespace-pre-line tw-max-h-full'>{testError}</p>
            </Collapsible>)}

            {!testError && (<Collapsible open={isOpen} trigger={<button>testcases {a} </button>} triggerWhenOpen={<button>testcases</button>} onOpening={() => { setIsExpanded(true) }} onClosing={() => { setIsExpanded(false); setIsOpen(false) }} overflowWhenOpen='auto' transitionTime={50}>
              <div class='tw-flex tw-justify-space-around' style={{ display: 'flex', justifyContent: 'space-around', maxHeight: '70%', marginTop: '0.5em', overflow: 'inherit' }}>
                {testResults.map((_, index) => <button style={{ border: ((testResults[index].Expected && testResults[index].Expected == testResults[index].Actual) || (testResults[index].expected_output && testResults[index].expected_output == testResults[index].actual_output) || (testResults[index].expectedOutput && testResults[index].expectedOutput == testResults[index].actualOutput)) ? '1.5px solid green' : '1.5px solid red' }} onClick={() => { setCurrenTest(testResults[index]); setCurrenTestcase(testcases[index]) }} key={index + 1}>testcase {index + 1}</button>)}
              </div>
              <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', marginLeft: '0.5em', maxHeight: '100%', marginTop: '0.5em' }}>
                <h5>Input:</h5>
                <div class='' contentEditable={false}>{currentTestcase.split('\n')[0]}</div>
                <h5>Expected Output:</h5>
                <div class='' contentEditable={false} >{currentTest.Expected || currentTest.expected_output || currentTest.expectedOutput}</div>
                <h5>Your Output:</h5>
                <div class='' contentEditable={false} style={{ border: ((currentTest.Expected && currentTest.Expected == currentTest.Actual) || (currentTest.expected_output && currentTest.expected_output == currentTest.actual_output) || (currentTest.expectedOutput && currentTest.expectedOutput == currentTest.actualOutput)) ? '1.5px solid green' : ' 1.5px solid red' }} >{currentTest.Actual || currentTest.actual_output || currentTest.actualOutput}
                </div>
              </div>
            </Collapsible>)}
          </div>
        </div>
      </div>
    </section>
  )
}


export default SubmitSolution;