import { makeStyles } from '@material-ui/core';
const drawerWidth = 240
const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  grid: {
    display: 'flex',
    justifyContent: 'center'
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 120
  },
  submitBtn: {
    width: "100%",
    backgroundColor: 'rgb(128, 188, 49)',
    color: "white",
    '&:hover': {
      backgroundColor: 'rgb(113, 174,33)',
      color: "black"
    },
  },
  cancelBtn: {
    width: "100%",
    backgroundColor: 'rgb(211,211,211)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'rgb(188, 72, 49)',
      color: "white"
    },
  },
  appBar: {
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    background: 'rgb(2,117,216)'
  },
  itemHeader: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: "15px"
  },
  drawerPaper: {
    width: drawerWidth,
    background: 'rgb(2,117,216)'
  },
  toolbar : theme.mixins.toolbar,
  links : {
    textDecoration :'none'
  }
}))
export default useStyle;