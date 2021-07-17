import React from 'react';
import axios from 'axios';
import {Tooltip,IconButton} from '@material-ui/core'
import MUIDataTable from 'mui-datatables';
import { withRouter } from 'react-router';
import { Update } from '@material-ui/icons';
const ScheduleTable = ({history}) => {
     const [data, setData] = React.useState([])
     const [loading,setLoading] = React.useState(false);
     React.useEffect(()=>{
          setLoading(true)
          fetchSchedule()
      },[])
      
     const fetchSchedule = () => {
          const res = axios.get('/schedules')
          .then((res)=>{
               if(res.status === 200){
                    setData(res.data.schedules)
               }
          }).catch(err => {alert(err)}).finally(()=> {
               setLoading(false);
          })
     }
     const columns = [
          {
               name: "accessory",
               label: "Accessory",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "accessoryQty",
               label: "Accessory Quantity",
               options: {
                    filter: true,
                    sort: true,
               }
          },
          {
               name: "companyName",
               label: "Company Name",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "contactNumber",
               label: "Contact Number",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "date",
               label: "Date",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "device",
               label: "Device",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "deviceQty",
               label: "Device Quantity",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "jobType",
               label: "Job Type",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "location",
               label: "Location",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name: "status",
               label: "Status",
               options: {
                filter: true,
                sort: true,
               }
              },
              {
               name : "technician",
               label : "Technician",
               options : {
                    filter : true,
                    sort : true
               }
              },
              {
               name: "update",
               label: "Update",
               options: {
                filter: false,
                sort: false,
                customBodyRenderLite : () => {
                    return (
                         <Tooltip title = "Update Info">
                              <IconButton onClick={()=>{history.push({pathname : '/Update',state : {data : data}})}}><Update/></IconButton>
                         </Tooltip>
                    );
                  }
               }
              },
     ]
     const row = data.map(Object.values)
     if(loading){
          return <p>loading</p>
     }
     return (
          <div>
               <MUIDataTable
                    title={"schedule list"}
                    data = {row}
                    // data = {data.map(values =>{
                    //      return [
                    //           values.accesory,
                    //           values.accesoryQty,
                    //           values.companyName,
                    //           values.contactNumber,
                    //           values.date,
                    //           values.device,
                    //           values.deviceQty,
                    //           values.jobType,
                    //           values.location,
                    //           values.status,
                    //           values.technician,
                    //      ]
                    // })}
                    columns = {columns}
               />
          </div>
     );
}

export default withRouter(ScheduleTable);