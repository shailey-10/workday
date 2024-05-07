import { Box, ThemeProvider, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';
import { JOBLISTURL } from './utils/constants';
import { JobDetails } from './utils/types';

function App() {
  
  const [jobList, setJobList] = useState<JobDetails[]>([])

  const theme = createTheme()

  theme.palette.text.disabled = '#8b8b8b'
  theme.palette.text.secondary = '#4d596a'
  theme.palette.text.secondary = '#4d596a'
  theme.palette.primary.contrastText = "#4943DA"
  
  useEffect(() => {
  const fetchJobs = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
    "limit": 10,
    "offset": 0
    });

const requestOptions = {
 method: "POST",
 headers: headers,
 body
};

fetch(JOBLISTURL, requestOptions)
 .then((response) => response.json())
 .then((result) => setJobList(result.jdList))
 .catch((error) => console.error(error));
  }
  console.log(jobList)

  fetchJobs()

  },[])

  return (
    <ThemeProvider theme = {theme}>
    <Box display='flex' rowGap={10} columnGap={10} flexWrap='wrap'  padding={5}>
      {
        jobList.map((job : JobDetails) => {
          return <Card job = {job} />
        })
      }
    </Box>
    </ThemeProvider>
  );
}

export default App;
