import { useEffect, useState } from 'react';
import { JOBLISTURL } from '../utils/constants';
import { JobDetails } from '../utils/types';

const useGetJobs = (offset : number) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
    const [jobList, setJobList] = useState<JobDetails[]>([])
    const [hasMore, setHasMore] = useState(true)

    useEffect(() => {
      setLoading(true)
      setError(false)
  const fetchJobs = async () => {
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    const body = JSON.stringify({
    "limit": 10,
    "offset": offset
    });

const requestOptions = {
 method: "POST",
 headers: headers,
 body
};

fetch(JOBLISTURL, requestOptions)
 .then((response) => response.json())
 .then((result) => {setJobList(prevJobs => {
  return [...prevJobs, ...result.jdList]})
  setHasMore(result.jdList.length > 0)
  setLoading(false)
 })
 .catch((error) => setError(true));
  }

  fetchJobs()

  },[offset])
  return {loading, error, hasMore, jobList}
}

export default useGetJobs