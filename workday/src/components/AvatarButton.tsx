import { Box, Stack, Typography } from "@mui/material";

type IProps = {
  text : string,
  onClick? : () => void;
}

const AvatarButton = ({text, onClick} : IProps) => {
  return (
    <Box borderRadius={1} columnGap={2} display='flex' justifyContent='center' alignItems='center' bgcolor={'primary.contrastText'} width='100%' height={50} onClick = {onClick}>
          <Stack direction="row" spacing={-1}>
      <img height={33} alt="Remy Sharp" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Blurred_Jack_Nicholson_avatar.png" />
      <img height={33} alt="Cindy Baker" src="https://upload.wikimedia.org/wikipedia/commons/a/a3/Blurred_Jack_Nicholson_avatar.png" />
    </Stack>
      <Typography color='#fff' textAlign={'center'}>{text}</Typography>
    </Box>  )
}

export default AvatarButton

