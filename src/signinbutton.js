import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Zoom from '@material-ui/core/Zoom';
import Tooltip from '@material-ui/core/Tooltip';
import * as firebase from 'firebase';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';


const styles = theme => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class CircularIntegration extends React.Component {


  
  constructor(props){
      super(props)
      this.state = {
        loading: false,
        success: false,
        Error: '',
ErrorMsg: false,
ErrorTitle: '',
SnackBarLoginSuccess: false,
SnackBarLoginTitle: ''
      };
      this.handleButtonClick = this.handleButtonClick.bind(this);
      this.handleClose = this.handleClose.bind(this)
  }



  



  handleButtonClick = () => {
      let Emailregex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

     // console.log(this.props.Email + '  Pw: '+this.props.Password)
    if (!this.state.loading) {
      this.setState(
        {
          success: false,
          loading: true,
        }
      
      );
    }

    if(this.props.Password.length  > 5 && Emailregex.test(this.props.Email) === true ){
      firebase.auth().signInWithEmailAndPassword(this.props.Email, this.props.Password).then((u)=>{

        this.setState({SnackBarLoginSuccess:true,SnackBarLoginTitle:'Logged In As '+u.user.email+' !.', success: true  });
    
  console.log(u.user)
      }).catch((error) =>{
        // Handle Errors here.
       // var errorCode = error.code;
        //var errorMessage = error.message;
        this.setState({Error: 'Error: '+error.code,ErrorMsg: true,ErrorTitle:error.message,success: false,loading: false,  
      });
        // ...
      })
}

else if(this.props.Email.length < 1){


    this.setState({Error:'Error: You Forgot To Write Email',ErrorTitle: 'Please write your email, the email text box was empty', ErrorMsg:true,success: false,       loading: false,     })

}
else if(Emailregex.test(this.props.Email) !== true){
    this.setState({Error:'Error: Invalid Email Format',ErrorTitle: 'The email you wrote is incomplete or invalid, you have to write valid email format i.e: email@yourdomain.com', ErrorMsg:true,success: false, loading: false})

}
else if(this.props.Password.length < 1){


    this.setState({Error:'Error: You Forgot To Write Password',ErrorTitle: 'Please write your Passwprd, the Password text box was empty', ErrorMsg:true,success: false, loading: false})

}
else if(this.props.Password.length < 6){
    this.setState({Error:'Error: Invalid Password ',ErrorTitle: 'Password Should Be Atleast 6 Characters', ErrorMsg:true,success: false, loading: false})

}

  };
  handleClose(){
    this.setState({SnackBarLoginSuccess:false});
  }
  

  render() {
    const { loading, success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

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
             <Zoom in={this.state.ErrorMsg}>
          <Tooltip TransitionComponent={Zoom} TransitionProps={{ timeout: 600 }}   
                   title={this.state.ErrorTitle}>
          <p style={{color:'red',fontSize:'15px',fontWeight:'700',cursor:'pointer'}}>{this.state.Error}</p></Tooltip>
          </Zoom>
      <div className={classes.root}>
        <div className={classes.wrapper}>
          
          {loading && <CircularProgress size={68} className={classes.fabProgress} />}
        </div>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={buttonClassname}
            disabled={loading}
            onClick={this.handleButtonClick}
          >
 Returning User? Login Now          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}



        </div>
      </div></div>
    );
  }
}

CircularIntegration.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CircularIntegration);