import * as React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import 'bootstrap/dist/css/bootstrap.min.css';
import Box from '@mui/material/Box';
import Colleges from './pages/colleges';
import Students from './pages/students';
import Dashboard from './pages/dashboard';

export default function CustomizedTables() {
  return (
    <>
     <Box sx={{ flexGrow: 1 }}>
       
     <Router>
     <AppBar position="static" style={{backgroundColor:'black'}}>
        <Toolbar>
        <Link to="/"><Typography variant="h6" component="div"  sx={{ marginLeft: '10px' }} style={{color:"white"}}>
            Dashboard
          </Typography></Link>
         <Link to="/colleges"><Typography variant="h6" component="div"  sx={{ marginLeft: '10px' }} style={{color:"white"}}>
            Colleges
          </Typography></Link>
         <Link to="/students"> <Typography variant="h6" component="div"  sx={{ marginLeft: '10px' }} style={{color:"white"}}>
            Students
          </Typography></Link>
         
        </Toolbar>
      </AppBar>
        <Switch>
        <Route exact path="/">
          <Dashboard />
          </Route>

          <Route exact path="/colleges">
          <Colleges />
          </Route>

          <Route exact path="/students">
          <Students />
          </Route>
         
        </Switch>
      
    </Router>
      
    </Box>
    <div>
  </div>
    </>
  );
}
