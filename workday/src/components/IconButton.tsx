import { Box, Typography } from '@mui/material';


type IProps = {
  text : string,
  onClick? : () => void;
}

const IconButton = ({text, onClick} : IProps) => {
  return (
    <Box sx={{cursor : 'pointer'}} borderRadius={1} display='flex' justifyContent='center' alignItems='center' bgcolor={'#54EFC2'} width='100%' height={40} onClick = {onClick}>
      <Typography textAlign={'center'}>{text}</Typography>
    </Box>
  )
}

export default IconButton