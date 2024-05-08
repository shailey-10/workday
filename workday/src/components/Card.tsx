import { Box, Chip, Tooltip, Typography } from "@mui/material"
import { useState } from "react"
import { capitalize } from "../utils/helper"
import { JobDetails } from "../utils/types"
import AvatarButton from "./AvatarButton"
import IconButton from "./IconButton"
import JdModal from "./JdModal"

const Card = ({ job }: { job: JobDetails }) => {
   const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box boxShadow={2} borderRadius={5} padding={4} maxWidth={350} minWidth={280} flex = '1 1 280px'>
      <Box mb={2}>
        {/* make this a random number */}
      <Chip label="⏳ Posted 2 days ago" size="medium" variant="outlined" />
      </Box>
      <Box  mb={2} display='flex' columnGap={2}>
      <img height={60} src = {job.logoUrl} alt={job.companyName} />
      <Box>
      <Typography color='text.disabled' fontWeight="600" variant="subtitle1">{capitalize(job.companyName)}</Typography>
      <Typography>{capitalize(job.jobRole)}</Typography>
      <Typography  variant="subtitle2">{capitalize(job.location)}</Typography>
      </Box>
      </Box>
      <Typography display='inline-block' mb={2} color='text.secondary'>Estimated Salary: {job.salaryCurrencyCode} {job.minJdSalary && job.minJdSalary + '-'} {job.maxJdSalary} LPA </Typography>
      <Tooltip slotProps={{
        popper: {
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [-10,-15],
              },
            },
          ],
        },
      }} title="Offered salary range" placement="top-start">
             <Typography sx={{cursor : 'pointer'}} ml={1} display='inline-block'>✅</Typography>
             </Tooltip>
      <Box height={230} sx={{
    maskImage : "linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0))"}}>
      <Typography fontSize={18} fontWeight={500}>About Company</Typography>
      <Typography fontSize={14}>{job.jobDetailsFromCompany}</Typography>
      </Box>
      <Typography sx={{cursor : 'pointer'}} onClick = {handleOpen} mb={2} mt={-1} color="primary.contrastText" textAlign='center'>View More</Typography>
      <Box height={50} mb={2}>
      {job.minExp && 
      <>
      <Typography color={'text.disabled'}>Minimum Experience</Typography>
      <Typography>{job.minExp} {job.minExp === 1 ? 'Year' : 'Years'}</Typography>
    </>
    }
      </Box>
      <Box display='flex' flexDirection='column' rowGap={2}>
        <IconButton text="⚡ Easy Apply" />
      <AvatarButton text="Unlock referral asks" />
      </Box>
      <JdModal description={job.jobDetailsFromCompany} open = {open} handleClose={handleClose} />
    </Box>
  )
}

export default Card