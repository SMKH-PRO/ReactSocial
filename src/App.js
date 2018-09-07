import React, { Component } from 'react';
import './App.css';

import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircle from '@material-ui/icons/Face';
import SignupIcon from '@material-ui/icons/PersonAdd';
import SigninIcon from '@material-ui/icons/Input';

import Logout from '@material-ui/icons/PowerSettingsNew';
import Banned from '@material-ui/icons/Block';
import HomeIcon from '@material-ui/icons/Home';


import createBrowserHistory from 'history/createBrowserHistory'

import {
Router,
  Route,
  Link
} from 'react-router-dom'
import Signin from './signin';
import register from './register.js';

import Home from './Home';
import Profile from './Profile.js';
import EditProfile from './EditProfile.js';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
const History = createBrowserHistory();

const config = {
  apiKey: "AIzaSyC4QySEUeiGU1M4f4TZHrSQE_i5a-fSYBQ",
  authDomain: "reactsocial-a36e6.firebaseapp.com",
  databaseURL: "https://reactsocial-a36e6.firebaseio.com",
  projectId: "reactsocial-a36e6",
  storageBucket: "reactsocial-a36e6.appspot.com",
  messagingSenderId: "534444970963"
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: '100vh',
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});



class MiniDrawer extends React.Component {


  constructor(props){
    super(props)
   this.state = {
      open: false,
      loggedIn: false,
      LogoutSuccess: false
    };

    
    this.checklogin =   this.checklogin.bind(this)
this.handleSnackClose = this.handleSnackClose.bind(this)

  }
  
  handleSnackClose(){
    this.setState({LogoutSuccess:false});
  }
checklogin(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.

   // console.log(user)
    this.setState({loggedIn: true})

      // ...
    } else {
      // User is signed out.
      // ...
console.log("Logged Out")
      this.setState({loggedIn: false})
    }
  });
};



componentDidMount(){
  this.checklogin();
}




  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, theme } = this.props;
  
    return (
      <Router history={History}>
      <div>
      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.state.LogoutSuccess}
      autoHideDuration={6000}
      onClose={this.handleSnackClose}
    >
      <SnackbarContent
        onClose={this.handleSnackClose}
       
        message={'Successfully Logged Out!'}
      />
    </Snackbar>


      <div className={classes.root}>
        <AppBar
          position="absolute"
          className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
        >
          <Toolbar disableGutters={!this.state.open}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, this.state.open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Link  to="/"><Typography className="HeaderHead" variant="title"  noWrap>
ReactSocial            </Typography></Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
         

            {/*List Items Starts Below*/}
            {  this.state.loggedIn ? (
              <span>
       <List>

            <Link to="/">   <ListItem button>
      <ListItemIcon>
        <HomeIcon />
      </ListItemIcon>
      <ListItemText primary="Home" />
    </ListItem></Link>


            <Link to="Profile">   <ListItem button>
      <ListItemIcon>
        <AccountCircle />
      </ListItemIcon>
      <ListItemText primary="Profile" />
    </ListItem></Link>


      <ListItem button>
      <ListItemIcon>
        <Banned />
      </ListItemIcon>
      <ListItemText primary="Banned Users" />
    </ListItem> </List> 


<Divider />
<List>
<ListItem onClick={()=>{firebase.auth().signOut().then(()=>{    this.setState({LogoutSuccess: true})})  }} button>
<ListItemIcon >
<Logout />
</ListItemIcon>
<ListItemText primary="Logout" />
</ListItem>
    </List>
  </span>
  ) : (


<List>
<Link to="/">   <ListItem button>
<ListItemIcon>
<SigninIcon />
</ListItemIcon>
<ListItemText primary="Login" />
</ListItem></Link>

<Link to="SignUp">
<ListItem button>
<ListItemIcon>
<SignupIcon />
</ListItemIcon>
<ListItemText primary="SignUp " />
</ListItem></Link> </List>

    )
}
{/*List Items Ends Above*/}

        </Drawer>
        <main  style={{overflow:'auto'}} className={classes.content}>
          <div className={classes.toolbar} />
         {/* <Typography noWrap>{this.state.loggedIn ?   <Home /> :  <SignIn />}</Typography>
         
         this.state.loggedIn ?   <Home /> :  <SignIn loggedIn={this.state.loggedIn} />*/}

<Route exact path="/" component={Signin} />
<Route exact path="/EditProfile" component={EditProfile} />

        <Route exact path="/Profile" component={Profile}/>   

        <Route exact path="/Home" component={Home}/>   
        <Route exact path="/SignUp" component={register}/>   

        
             </main>
        
      </div>
      
      </div>
    </Router>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MiniDrawer);