import { Box, Typography } from '@mui/material'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import Card from '../components/Card'
import Filters from '../components/Filters'
import useGetJobs from '../hooks/useGetJobs'
import { RootState } from '../redux/store'
import { JobDetails } from '../utils/types'

const Home = () => {
  const [offset, setOffset] = useState(0)
  const observer = useRef<IntersectionObserver | null>()
  const {loading, error, hasMore, jobList} = useGetJobs(offset)
  const minExp = useSelector((state : RootState) => state.filter.minExp)
  const companyName = useSelector((state : RootState) => state.filter.companyName)
  const [filteredJobList, setFilteredJobList] = useState(jobList);
  const minBasePay = useSelector((state : RootState) => state.filter.minBasePay)
  const role = useSelector((state : RootState) => state.filter.role)
  const type = useSelector((state : RootState) => state.filter.type)

  useEffect(() => {
    let filtered = jobList
    if(companyName){
      filtered = filtered.filter((job) => job.companyName.toLowerCase().startsWith(companyName.toLowerCase()))
    }
    if(minExp){
      filtered = filtered.filter((job) => job.minExp && job.minExp <= Number(minExp))
    }
    if(role && role?.length > 0){
      filtered = filtered.filter((job) => role.includes(job.jobRole.toLowerCase()))
    }
    if(minBasePay){
      filtered = filtered.filter((job) => job.minJdSalary ? job.minJdSalary >= Number(minBasePay.slice(0, -1)) : job.maxJdSalary && job.maxJdSalary >= Number(minBasePay.slice(0, -1)))
    }
        if(type){
          if(type.length === 1 && type[0] === 'remote'){
            filtered = filtered.filter((job) => job.location.toLowerCase() === 'remote')
          }else if(type.length === 1 && type[0] !== 'remote'){
                        filtered = filtered.filter((job) => job.location.toLowerCase() !== 'remote')

          }
    }
    setFilteredJobList(filtered)
  },[jobList, minExp, companyName, role, minBasePay, type])



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

  return (
    <Box  padding={5}>
    <Filters />
    <Box display='flex' justifyContent={"center"} rowGap={10} columnGap={10} flexWrap='wrap'>
      {
        filteredJobList.map((job : JobDetails, index : number) => {
          if(filteredJobList.length === index + 1){
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
  )
}

export default Home