import { Link } from "react-router-dom"; 
function ProblemStatement(props) {
    const title = props.title;
    const acceptance = props.acceptance;
    const difficulty = props.difficulty;

    const truncatedTitle=title.length>30?title.slice(0,32)+'...':title; 
    const titleForUrl= truncatedTitle.replace(/ /g,'-'); 

    return (
           
            <tr class='tw-flex tw-justify-evenly tw-gap-4 tw-mt-1 tw-text-sm tw-p-2'>
              <td class='tw-truncate tw-basis-1/4'>
                <Link className='titleLink' to={`/user/submitSolution/${titleForUrl}`}>{truncatedTitle}</Link>
              </td>
              <td class='tw-basis-1/4'>
                {acceptance}
              </td>
              <td class='tw-basis-1/4' style={{color:difficulty==='easy'?'#01b282':difficulty=='medium'?'#ffa700':'#ff3232'}}>
                {difficulty}
             </td>
           </tr>
           

           )
          
}

export default ProblemStatement;