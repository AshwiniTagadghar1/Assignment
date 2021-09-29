import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  
const StyledModal = ({open,handleClose,modalData})=> {
    const history = useHistory();
    return (
        <Modal
        open={open}
        onClose={handleClose}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          
        <Box sx={style} className="text-center">
          <Typography id="modal-modal-title" variant="h4" component="h4">{modalData?.name}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">{modalData?.nameOfcollege[0].name}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">{modalData?.country}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">{modalData?.year_founded}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">batch_year: {modalData?.batch_year}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">Skills</Typography>
            
          <Stack direction="row" spacing={1}>
                {modalData?.skills.split(',').map(x=> {
                 return <Chip label={x} component="a" href="api/student" onClick={e=> e.preventDefault()} />
                })}
                          
           </Stack> 
               
                
      
           
     
        </Box>
        
      </Modal>
    )
}

export default StyledModal