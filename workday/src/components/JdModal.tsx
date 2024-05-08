import { Box, Modal, Typography } from '@mui/material'

type IProps = {
  open : boolean
  handleClose : () => void
  description : string
}

const JdModal = ({open, handleClose, description} : IProps) => {

  const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius : 2
};
  return (
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
          <Typography textAlign="center" id="modal-modal-title" fontWeight={600} variant="h6" component="h2">
            Job Description
          </Typography>
           <Typography id="modal-modal-title" fontWeight={600} fontSize={16} variant="h6" component="h2">
            About Company
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {description}
          </Typography>
        </Box>
      </Modal>
  )
}

export default JdModal