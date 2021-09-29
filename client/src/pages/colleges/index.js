import React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import StyledModal from '../../Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { TextField,Button } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (event) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }

const Colleges = ()=> {
    const [origdata,setorigData]=React.useState([])
  const [data,setData]=React.useState([])
  React.useEffect(()=> {
    axios.get('http://localhost:8088/api/college').then(x=> {
      setorigData(x.data);
      setData(x.data)})
  },[])
  console.log(data);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //  page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const [open, setOpen] = React.useState(false);
  const [modalData,setModalData]=React.useState(null)
  const handleOpen = (x) => {
    setOpen(true);
    setModalData(x)
  };
  const handleClose = () => {
    setOpen(false);setModalData(null)}
  const [collegeFilter,setCollegeFilter] = React.useState('');
const handleClick = ()=> {
  const  y = origdata.filter(x => x.name?.toLowerCase().includes(collegeFilter?.toLowerCase()));
  setData(y);
}
const handleClear = ()=>   {
  setCollegeFilter('');
  setData(origdata)};

    return <>
    <div className="row px-3 my-2">
      <div className="col-12 col-md-10 mb-2">
    <TextField  label="College Name" variant="standard" placeholder="Search college name" fullWidth value={collegeFilter} onChange={(e)=>setCollegeFilter(e.target.value) } /></div>
    
    <div className="col-12 col-md-1 mb-2">
    <Button variant="contained" onClick={()=> handleClear()}>Clear</Button></div>
    <div className="col-12 col-md-1 mb-2">
    <Button variant="contained" onClick={()=> handleClick()}>Search</Button></div>
    </div>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">year_founded</StyledTableCell>
            <StyledTableCell align="right">country</StyledTableCell>
            <StyledTableCell align="right">state</StyledTableCell>
            <StyledTableCell align="right">course</StyledTableCell>
            <StyledTableCell align="right">Details</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data).map((row) => (
            <StyledTableRow key={row._id}>
             
            
   
              <StyledTableCell align="right">{row.name}</StyledTableCell>
              <StyledTableCell align="right">{row.year_founded}</StyledTableCell>
              <StyledTableCell align="right">{row.country}</StyledTableCell>
              <StyledTableCell align="right">{row.state}</StyledTableCell>
              <StyledTableCell align="right">{row.course}</StyledTableCell>
              <StyledTableCell align="right"> <Button variant="contained"  onClick={()=> {
              handleOpen(row)
              
            console.log('clicked')
            
            }
            
            }>View</Button></StyledTableCell>
            </StyledTableRow>
             
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[10,20, { label: 'All', value: -1 }]}
              colSpan={3}
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    <StyledModal open={open} handleClose={handleClose} modalData={modalData}/>
    </>

}
export default Colleges