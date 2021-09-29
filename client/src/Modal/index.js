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
          <Typography id="modal-modal-title" variant="P" component="P">{modalData?.city},{modalData?.state},{modalData?.country}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">Total Students: {modalData?.total_students}</Typography>
          <Typography id="modal-modal-title" variant="P" component="P">Courses</Typography>
            
              <Stack direction="row" spacing={1}>
                {modalData?.course.split(',').map(x=> {
                 return <Chip label={x} component="a" href="api/student" onClick={e=> e.preventDefault()} />
                })}
               
                
      </Stack>
           
      <Button variant="contained" onClick={()=> history.push(`/students?id=${modalData.id}`)}>View Students</Button>
         
        </Box>
        
      </Modal>
    )
}

export default StyledModal