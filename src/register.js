import React, { Component } from 'react';
//import './signin.css';
import * as firebase from 'firebase';


import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Lock from '@material-ui/icons/Lock';

import {Link} from 'react-router-dom'
import AccountBox from '@material-ui/icons/AccountBox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import Regbtn from './RegisterButton';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';






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
SnackBarLoginTitle: '',
ConfirmPassword: '',
  }
this.MaxLimit = this.MaxLimit.bind(this);
this.handleClose = this.handleClose.bind(this)







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

  setTimeout(()=>{  this.props.history.push('SignUp')
},500)

        this.setState({loggedIn: false})
      }
    });
  };
  
  
  
  componentDidMount(){
    this.checklogin();
  }
  

  handleClose(){
    this.setState({SnackBarLoginSuccess:false});
  }

keydownHandler(e){
this.setState({Email: e.target.value})
//console.log( this.state.Email)
}

keydownHandlerPwCnfrm(e){
  this.setState({ConfirmPassword: e.target.value})
  //console.log( this.state.Password)
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
Lastkeydown(e){

  if(e.keyCode == 13){

 
this.setState({EnterPressed:true})

alert(this.state.EnterPressed)
 }

}
  render() {
    
    return (
      <div>

      <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={this.state.SnackBarLoginSuccess}
      autoHideDuration={6000}
      onClose={this.handleClose}
    >
      <SnackbarContent
        onClose={this.handleClose}
       
        message={this.state.SnackBarLoginTitle}
      />
    </Snackbar>

      <div className="Loginparent">
   <div className="Loginchild" >
 

<img className="logologin" alt="Login Icon" src={require('./signup.png')} />

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
            <Lock/>
          </Grid>
          <Grid item>
            <TextField onChange={this.keydownHandlerPwCnfrm.bind(this)}  value={this.state.ConfirmPassword} id="confirm-input"
          label="Confirm Password"
          
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
            
         
          
          <Regbtn ConfirmPassword={this.state.ConfirmPassword} Email={this.state.Email} Password={this.state.Password}/>
          </Grid>

     

     
        </Grid>
        <br/>
        <Divider style={{width:"80%"}} /><Divider style={{width:"80%"}} /><Divider style={{width:"80%"}} />
      <br/>
      <Link  to="/">  <Button color="secondary" variant="extendedFab"  > Have An Account? Login !</Button>
</Link>
        
      </div>
    </div>
     
      </div>
    );
  }
}

export default Signin;
