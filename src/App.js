import React from 'react'; 
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';
import Accessories from './Components/AccessoriesMgmt/accessories';
import Devices from './Components/DeviceMgmt/devices';
import Technicians from './Components/TechnicianMgmt/technicians';
import Update from './Components/UpdateInfo/update';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import useStyle from './Styling';
function App() {
  const classes = useStyle();
  return ( 
      <BrowserRouter>
      <div className = {classes.root}>
        <ScheduleTable/>
      <Switch>
        <Route path = '/ScheduleForm'>
          <ScheduleForm/>
        </Route>
        <Route path = '/ScheduleTable'>
          <ScheduleTable/>
        </Route>
        <Route path ='/Update'>
          <Update/>
        </Route>
        <Route path = '/Accessories'>
          <Accessories/>
        </Route>
        <Route path = '/Devices'>
          <Devices/>
        </Route>
        <Route path = '/Technicians'>
          <Technicians/>
        </Route>
      </Switch>
      </div>
      </BrowserRouter>
  );
}

export default App;
