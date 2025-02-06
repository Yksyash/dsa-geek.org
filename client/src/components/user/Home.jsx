import { useState, useEffect } from "react";
import Navbar from './Navbar';
import AutoChangingText from './AutoChangingText';
// import LogoutBar from './LogoutBar'
import ProblemStatement from './ProblemStatement';
import Background from '../../assets/person-playing-3d-video-games-device.jpg'
import ProblemSkeleton from '../skeletons/ProblemSkeleton';
import Skeleton from "@mui/material/Skeleton";
// import  Box  from "@mui/material";


function Home() {

  const [problemSet, setProblemSet] = useState([]);
  const [problems, setProblemsOnPage] = useState()
  const [loading, setLoading] = useState(true);
  const problemsPerPage = 10;

  useEffect(() => {
    const fetchdata = async () => {
      setLoading(true);
      await fetch('http://localhost:3000/questions')
        .then(res => res.json())
        .then(jsonData => {
          setProblemSet([...jsonData])
          setLoading(false)
        })
    }
    fetchdata();
  }, []);


  useEffect(() => { setProblemsOnPage(problemSet.slice(0, 10)) }, [problemSet]);

  const setOnPage = (pageNumber) => {
    setProblemsOnPage(problems => problemSet.slice(problemsPerPage * pageNumber, problemsPerPage * pageNumber + problemsPerPage));
  }

  return (

    <section>

      <Navbar />
      <div class='tw-mx-4 tw-py-4 tw-grid sm:tw-grid-cols-4 tw-gap-y-4'>
        <div class='tw-p-4 tw-bg-gradient-to-l tw-from-indigo-500 sm:tw-col-span-2 md:tw-col-span-3 tw-font-be tw-text-xl sm:tw-text-3xl md:tw-text-6xl'>
          {loading ? (<Skeleton variant="rounded" sx={{ bgcolor: 'indigo.500' }} />) : (<AutoChangingText />)}
        </div>

        <div class='tw-hidden sm:tw-block sm:tw-col-span-2 md:tw-col-span-1 tw-bg-indigo-600'>
          {loading ? <Skeleton variant="reactangular" sx={{ margin: 'auto' }} height={'90%'} width={'90%'} /> : (<img src={Background} class='tw-mix-blend-' alt="Background Image" />)}
        </div>

        <div class='tw-flex tw-flex-col tw-shrink sm:tw-col-span-3 sm:tw-pr-4'>
          <table>
            <thead class='tw-border-b tw-border-gray-500'>
              <tr class='tw-flex tw-justify-evenly tw-gap-4 tw-mb-4 tw-text-slate-300  tw-text-sm'>
                <th class='tw-basis-1/4 tw-text-left'>Title</th>
                <th class='tw-basis-1/4 tw-text-left' >Acceptance</th>
                <th class='tw-basis-1/4 tw-text-left'>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (<ProblemSkeleton />) : (problems.map((problem, index) => <ProblemStatement key={index}

                title={problem.title}
                acceptance={problem.acceptance}
                difficulty={problem.difficulty}
              />))
              }
            </tbody>
          </table>
          <div class='tw-flex tw-gap-x-4 tw-justify-end tw-pt-4 tw-pr-8 '>
            {Array.from({ length: Math.ceil(problemSet.length / problemsPerPage) }).map((_, index) => (
              <button class='tw-border-gray-500 tw-border tw-py-1 tw-p-2.5 tw-rounded' key={index} onClick={() => setOnPage(index)}>
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <div class='sm:tw-pl-4 '>
          <div class='tw-border-gray-500 tw-border tw-rounded-lg tw-p-2 tw-bg-neutral-800'>
            <h1 class='tw-text-left sm:tw-text-center tw-text-slate-300 tw-font-medium tw-m-1'>Trending Concepts</h1>
            <div class='tw-flex tw-flex-wrap tw-gap-3 tw-justify-evenly tw-text-sm tw-mt-4 tw-text-slate-300'>
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Binary Tree</h2> </Skeleton>) : (<h2 class='tw-bg-gray-600 tw-rounded-2xl tw-py-1 tw-px-2'>BinaryTree</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Linked Lists</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Linked Lists</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Sliding Window</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Sliding Window</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Two Pointers</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Two Pointers</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Binary Search</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Binary Search</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Graphs</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Graphs</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Stack</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Stack</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Greedy</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Greedy</h2>)}
              {loading ? (<Skeleton variant="rectangular" sx={{ bgcolor: 'grey.800', borderRadius: '20px' }}><h2>Priority Queue</h2></Skeleton>) : (<h2 class='tw-bg-gray-700 tw-rounded-2xl tw-py-1 tw-px-2'>Priority Queue</h2>)}
            </div>
          </div>
        </div>
      </div>

    </section>
  )

}


export default Home;