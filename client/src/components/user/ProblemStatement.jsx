import { Link } from "react-router-dom"; 
function ProblemStatement(props) {
    const title = props.title;
    const acceptance = props.acceptance;
    const difficulty = props.difficulty;

    const truncatedTitle=title.length>30?title.slice(0,32)+'...':title; 
    const titleForUrl= truncatedTitle.replace(/ /g,'-'); 

    return (
            
            <tr className='ProblemStatement'>
              <td  width={300} align='left' >
                <Link className='titleLink' to={`/user/submitSolution/${titleForUrl}`}>{truncatedTitle}</Link>
              </td>
              <td width={50}>
                {acceptance}
              </td>
              <td width={100} style={{color:difficulty==='easy'?'green':difficulty=='medium'?'#ff9a00':'#a70000'}}>
                {difficulty}
             </td>
           </tr>
           

           )
          
}

export default ProblemStatement;