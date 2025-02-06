import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export default function HomeSkeleton() {
  return (
    <Stack spacing={1}>
      {/* For variant="text", adjust the height via font-size */}
      <Skeleton variant="text" sx={{ fontSize: '1rem', background:'gray' }} />
      {/* For other variants, adjust the size with `width` and `height` */}
      <Skeleton variant="circular" width={40} height={40} sx={{background:'gray'}} />
      <Skeleton variant="rectangular" width={210} height={60} sx={{background:'gray'}} />
      <Skeleton variant="rounded" width={210} height={60} sx={{background:'gray'}} />
    </Stack>
  );
}
