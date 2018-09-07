import React, { Component } from 'react';
import './signin.css';
import * as firebase from 'firebase';


import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Lock from '@material-ui/icons/Lock';

import AccountBox from '@material-ui/icons/AccountBox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import LoginBtn from './signinbutton'





class Signin extends Component {


  constructor(props){
    super(props)
  this.state ={
Email: '',
Password: '',
Error: '',
ErrorMsg: false,
ErrorTitle: '',
SnackBarLoginSuccess: false,
SnackBarLoginTitle: ''
  }
this.MaxLimit = this.MaxLimit.bind(this);








//console.log(this.props.history)


  }


  checklogin(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
  
     // console.log(user)
      this.props.history.push('Home')
        // ...
      } else {
        // User is signed out.
        // ...
  console.log("Logged Out")
  this.props.history.push('/')

        this.setState({loggedIn: false})
      }
    });
  };
  
  
  
  componentDidMount(){
    this.checklogin();
  }
  

  
keydownHandler(e){
this.setState({Email: e.target.value})
/console.log( this.state.Email)
}
keydownHandlerPw(e){
  this.setState({Password: e.target.value})
  //console.log( this.state.Password)
  }
MaxLimit(e,Limit,ErrorTitle,ShortDescription){
//console.log(e.target)


if( e.target.value.length > Limit ){ if(e.keyCode !== 8){e.preventDefault(); this.setState({Error: ShortDescription,ErrorMsg: true,ErrorTitle:ErrorTitle}); return false;}}
else if(e.target.value.length < Limit + 1){this.setState({Error: '',ErrorMsg: false,ErrorTitle:''});}

}
  
  render() {
    
    return (
      <div>


      <div className="Loginparent">
   <div className="Loginchild" >
 

<img className="logologin" alt="Login Icon" src={require('./login.png')} />

        <Grid container className="maxwidth250" spacing={8} alignItems="flex-end">
          <Grid item>
            <AccountBox/>
          </Grid>
          <Grid item>
            <TextField value={this.state.Email}  onKeyDown={(e)=>{this.MaxLimit(e,50,'Character Limit Exceeded, Please Write Email With Less Than 50 Characters.','Character Lenght Exceeded!')}}  onChange={this.keydownHandler.bind(this)} id="input-with-icon-grid" label="Your Email" />
          </Grid>
          <br/>
          <Grid item>
            <Lock/>
          </Grid>

          <Grid item>
            <TextField  onKeyDown={(e)=>{this.MaxLimit(e,20,'Password Must Be Greater Than 6 Characters And Less Than 20 Characters!','Character Lenght Exceeded!')}}  onChange={this.keydownHandlerPw.bind(this)}  value={this.state.Password} id="password-input"
          label="Password"
          
          type="password"
          autoComplete="current-password"
          margin="normal"   />
          </Grid>
          <Grid item>
          <Zoom in={this.state.ErrorMsg}>
          <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }}   
                   title={this.state.ErrorTitle}>
          <p style={{color:'red',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>{this.state.Error}</p></Tooltip>
          </Zoom>
          </Grid>
          <Grid item>
            
         
          <LoginBtn Email={this.state.Email} Password={this.state.Password} /> </Grid>

     

     
        </Grid>
        <br/>
        <Divider style={{width:"80%"}} /><Divider style={{width:"80%"}} /><Divider style={{width:"80%"}} />
      <br/>
      <Link  to="/SignUp">  <Button color="secondary" variant="extendedFab" aria-label="Delete" > New Here? Register Now!</Button></Link>

        
      </div>
    </div>
     
      </div>
    );
  }
}

export default Signin;
