import { Box, ThemeProvider, Typography, createTheme } from '@mui/material';
import { useCallback, useRef, useState } from 'react';
import './App.css';
import Card from './components/Card';
import useGetJobs from './hooks/useGetJobs';
import { JobDetails } from './utils/types';

function App() {
  
  const theme = createTheme()
  const [offset, setOffset] = useState(0)
  const observer = useRef<IntersectionObserver | null>()
  const {loading, error, hasMore, jobList} = useGetJobs(offset)
  
  const lastJobElement = useCallback((node: any) => {
    if(loading) return
    if(observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore){
       setOffset(prevOffset => prevOffset + 10)
      }
  })
  if(node) observer.current?.observe(node)
  },[loading, hasMore])

  theme.palette.text.disabled = '#8b8b8b'
  theme.palette.text.secondary = '#4d596a'
  theme.palette.text.secondary = '#4d596a'
  theme.palette.primary.contrastText = "#4943DA"
  

  return (
    <ThemeProvider theme = {theme}>
    <Box>
      <Box display='flex' justifyContent={"center"} rowGap={10} columnGap={10} flexWrap='wrap'  padding={5}>
      {
        jobList.map((job : JobDetails, index : number) => {
          if(jobList.length === index + 1){
            return <Box ref={lastJobElement} key={job.jdUid} > <Card  job = {job} /> </Box>
          }else{
            return <Card key={job.jdUid} job = {job} />
          }
        })
      }
      </Box>
      <Box>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography>Error</Typography>}
      {!hasMore && <Typography mb={4} textAlign='center'>No entries to show</Typography>}
      </Box>
    </Box>
    </ThemeProvider>
  );
}

export default App;
