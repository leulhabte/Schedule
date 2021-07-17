import React from 'react';
import { Select, TextField, MenuItem, Grid, Container, Box, Paper, FormControl, InputLabel, Button, AppBar, Toolbar, Typography, Hidden, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Divider} from '@material-ui/core';
import { Menu, CalendarToday, Devices, Router, Build } from '@material-ui/icons'
import axios from 'axios' 
import useStyle from './Styling';
import { Link, withRouter } from 'react-router-dom'
const ScheduleForm = () => {
    const classes = useStyle();
    const [date, setDate] = React.useState(new Date(''));
    const [type, setDeviceType] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [location, setLocation] = React.useState('');
    const [contactNum, setContactNum] = React.useState('');
    const [accesoriesQty, setAccessoriesQty] = React.useState(0);
    const [deviceQty, setDeviceQty] = React.useState(0);
    const [accesoriesType, setAccessoriesType] = React.useState('');
    const [jobType, setJobType] = React.useState('');
    const [technician, setTechnician] = React.useState('');
    const [mobileScreen, setMobileScreen] = React.useState(false);
    const [acsData,setAcsData] = React.useState([]);
    const [devData,setDevData] = React.useState([]);
    const [tecData,setTecData] = React.useState([]);
    const handleMobileScreen = () => {
        setMobileScreen(!mobileScreen);
    }
    React.useEffect(()=>{
        fetchAccessories()
        fetchDevices()
        fetchTechnicians()
    },[])
    const fetchAccessories = async () => {
        const res = await axios.get('/accessories')
        setAcsData(res.data.accessories)
    }
    const fetchDevices = async () => {
        const res = await axios.get('/devices')
        setDevData(res.data.devices)
    }
    const fetchTechnicians = async () => {
        const res = await axios.get('/technicians')
        setTecData(res.data.technicians)
    }
    const postForm = async () => {
        const schForm = {
            date : date,
            companyName : company,
            contactNumber : contactNum,
            location : location,
            device : type,
            deviceQty : deviceQty,
            accessory : accesoriesType,
            accessoryQty : accesoriesQty,
            technician : technician,
            jobType : jobType,
        }
        const res = await axios.post('/schedule/add',schForm)
    }
    const drawerHeader = (
        <div>
            <Box display='flex' justifyContent='center' p={2}>
                <Typography variant='h6' classes={{root : classes.itemHeader}}>Mella Tech</Typography>
            </Box>
        </div>
    )
    const drawerItems = (
        <div>
            <Divider />
            <List>
                <Link to = '/ScheduleTable'>
                <ListItem button>
                    <ListItemIcon><CalendarToday /></ListItemIcon>
                    <ListItemText>Schedule</ListItemText>
                </ListItem>
                </Link>
                <Link to = '/Devices'>
                <ListItem button>
                    <ListItemIcon><Devices/></ListItemIcon>
                    <ListItemText>Device Management</ListItemText>
                </ListItem>
                </Link>
                <Link to = '/Accessories'>
                <ListItem button>
                    <ListItemIcon><Router/></ListItemIcon>
                    <ListItemText>Accessories Management</ListItemText>
                </ListItem>
                </Link>
                <Link to = '/Technicians'>
                <ListItem button>
                    <ListItemIcon><Build/></ListItemIcon>
                    <ListItemText>Technician Management</ListItemText>
                </ListItem>
                </Link>
            </List>
        </div>
    )
    return (
        <div className={classes.root}>
            <AppBar classes={{root : classes.appBar}} display='flex'>
                <Toolbar>
                    <Hidden mdUp>
                        <IconButton
                            edge="start"
                            onClick={handleMobileScreen}
                        >
                            <Menu />
                        </IconButton>
                    </Hidden>
                </Toolbar>
            </AppBar>
            <nav>
                <Hidden mdUp>
                    <Drawer
                        open={mobileScreen}
                        onClose={handleMobileScreen}
                        variant='temporary'
                        classes={{ paper: classes.drawerPaper }}
                    >
                        {drawerHeader}
                        {drawerItems}
                    </Drawer>
                </Hidden>
                <Hidden smDown>
                    <Drawer
                        open
                        variant='permanent'
                        classes={{ paper: classes.drawerPaper }}
                        display='flex'
                    >
                        {drawerHeader}
                        {drawerItems}
                    </Drawer>
                </Hidden>
            </nav>
            <div className = {classes.toolbar}/>
            <Container maxWidth='xl'>
                <Box paddingY={3} />
                <Grid container classes={{root : classes.grid}}>
                    <Grid item md={6} xs={12}>
                        <form onSubmit = {postForm}>
                            <Paper>
                                <Box display='flex' flexDirection='column'>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required variant="outlined" type="datetime-local" defaultValue="00-00-00T00:00" onChange={(e) => { setDate(e.target.value) }} value={date} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required fullWidth label="Company" onChange={(e) => { setCompany(e.target.value) }} value={company} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required variant="outlined" type="number" label="Contact Number" onChange={(e) => { setContactNum(e.target.value) }} value={contactNum} /></Box>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required fullWidth label="Location" onChange={(e) => { setLocation(e.target.value) }} value={location} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{root : classes.formControl}}>
                                        <InputLabel>Device Type</InputLabel>
                                        <Select required
                                            value={type}
                                            onChange={(e) => { setDeviceType(e.target.value) }}
                                        >
                                            {devData.map((values)=>(
                                                <MenuItem value = {values.deviceName}>{values.deviceName}</MenuItem>
                                            ))}
                                            </Select>
                                    </FormControl>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required variant="outlined" type="number" label="Device Qty" onChange={(e) => { setDeviceQty(e.target.value) }} value={deviceQty} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{root : classes.formControl}}>
                                        <InputLabel>Accessories Type</InputLabel>
                                        <Select required
                                            value={accesoriesType}
                                            onChange={(e) => { setAccessoriesType(e.target.value) }}
                                        >
                                            {acsData.map((values)=>(
                                                <MenuItem value = {values.accessory}>{values.accessory}</MenuItem>
                                            ))}
                                            </Select>
                                    </FormControl>
                                    <Box paddingY={2} />
                                    <Box marginX={3}><TextField required variant="outlined" type="number" label="Accesories Qty" onChange={(e) => { setAccessoriesQty(e.target.value) }} value={accesoriesQty} /></Box>
                                    <Box paddingY={2} />
                                    <FormControl classes={{root : classes.formControl}}>
                                        <InputLabel>Technician Assigned</InputLabel>
                                        <Select required
                                            value={technician}
                                            onChange={(e) => { setTechnician(e.target.value) }}
                                        >{tecData.map((values)=>(
                                            <MenuItem value = {values.technician}>{values.technician}</MenuItem>
                                        ))}
                                        </Select>
                                    </FormControl>
                                    <FormControl classes={{root : classes.formControl}}>
                                        <InputLabel>Job Type</InputLabel>
                                        <Select required
                                            value={jobType}
                                            onChange={(e) => { setJobType(e.target.value) }}
                                        >
                                            <MenuItem value={"Installation"}>Installation</MenuItem>
                                            <MenuItem value={"Maintenance"}>Maintenance</MenuItem>
                                            <MenuItem value={"Dismantle"}>Dismantle</MenuItem>
                                            <MenuItem value={"Caliberation"}>Caliberation</MenuItem>
                                            <MenuItem value={"Replacement"}>Replacement</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Box paddingY={3} />
                                    <Box display="flex" flexDirection='row' marginX={3}>
                                        <Button type="submit" classes={{root : classes.submitBtn}}>Submit</Button>
                                        <Box paddingX={2} />
                                        <Button classes={{ root: classes.cancelBtn }}>Cancel</Button>
                                    </Box>
                                    <Box paddingY={2} />
                                </Box>
                            </Paper>
                        </form>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default withRouter(ScheduleForm);

// onClick = {
//     ()=> history.push({
//         pathname: '/template',
//         state: { data: {name: 'kira', age: 23} }
//       })
// }

// const {name, age} = history.location.state.data

