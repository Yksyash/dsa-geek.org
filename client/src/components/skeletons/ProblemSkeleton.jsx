import { Paper, Stack } from "@mui/material";
import  Box  from "@mui/material/Box";
import  Skeleton  from "@mui/material/Skeleton";

export default function ProblemSkeleton (){

    return (

        

        Array.from(new Array(10)).map((_, index) => 
        
        <Skeleton variant="rectangular"  key={index} sx={{display:'flex', bgcolor: index % 2 === 0 ? 'transparent' :'#3c3c3c'}} height={25}></Skeleton>

        )

      

     )
        
    
}