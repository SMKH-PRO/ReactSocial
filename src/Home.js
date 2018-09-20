import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './Home.css'
import * as firebase from 'firebase';
import Paper from '@material-ui/core/Paper';
import Attach from '@material-ui/icons/AttachFile';
import Button from '@material-ui/core/Button';
import autosize from "./AutoResizeTxtArea";
import CircularProgress from '@material-ui/core/CircularProgress';
import Divider from '@material-ui/core/Divider';


class Home extends Component {


  constructor(props){
    super(props)
  this.state ={
    Name:'',
    ProfileIMG:'',
    PostText:'',
    PostLoading:false,
    PostType:'Text',
    PostAttachment:'',
    openDialog:false,
    DialogTitle: '',
    DialogDescription:'',

  }
  this.FunctionBeforeRender = this.FunctionBeforeRender.bind(this)

  this.handleChange = this.handleChange.bind(this)
  this.keyDownHandler =   this.keyDownHandler.bind(this)
  this.Post =   this.Post.bind(this)

  }

  componentDidMount(){
    this.textarea.focus();
    autosize(this.textarea);


    this.FunctionBeforeRender()
    }

    






    handleChange = name => event => {
      this.setState({
        [name]: event.target.value.replace(/\s\s+/g, ' '),
      });

      if(name == "PostText"){
if(this.state.PostText.length > 499){
  setTimeout(() => {
    this.setState({PostText:this.state.PostText.substring(0, 500)})

  }, 20);
}
}
    
    };
FunctionBeforeRender(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.

this.setState({Name:user.displayName,ProfileIMG:user.photoURL})
      firebase.database().ref(`USERDETAILS/${user.uid}/`).on('value',(data)=>{
        if(data.child("Name").val() != null && data.child("Bio").val() != null && data.child("Country").val() && data.child("City").val()!= null && data.child("Age").val() != null && data.child("Gender").val() != null ){
      
      
      
        console.log("This user has a complete")
        }else{
          console.log("Something Is Missing!",data.child("Gender").val(),data.child("Bio").val(),data.child("Age").val() )
      
          this.props.history.push('EditProfile')
          
        }
      
      })
      
   // console.log(user)

      // ...
    } else {
      // User is signed out.
      this.props.history.push('/')

    }
  });
}



keyDownHandler(e){






  var s;

  let convertEmojees = {
    '<3': '\u2764\uFE0F',
    '</3': '\uD83D\uDC94',
    ':D': '\u{1f600}',
    'XD': '\uD83D\uDE00',
    ':)': '\uD83D\uDE03',
   '>_<':'\u{1f606}',
    ';)': '\uD83D\uDE09',

    ':(': '\uD83D\uDE12',
    ':P': '\uD83D\uDE1B',
    ';P': '\uD83D\uDE1C',
    ':P': '\uD83D\uDE1B',
    ';P': '\uD83D\uDE1C',

    ":'(": "\uD83D\uDE22",
    "#_#":"\u{1f60D}",
    "*_*":"\u{1f929}",
    "$_$":"\u{1f911}",
    "-_-":"\u{1f611}",
    "sick!":"\u{1f912}",
    "B)":"\u{1f60E}",
    ":O":"\u{1f632}",
    "8O":"\u{1f631}",
    "<3":"\u{2764}",
    "</3":"\u{1f494}",
    ".!.":"\u{1f446}",
    "(Y)":"\u{1f440}",
    "!3":"\u{1f440}",
    "santa":"\u{1f385}",
    "!..!":"\u{1f91f}",
    
    


 }
  for( s in convertEmojees) {
    var regex = new RegExp(s.replace(/([()[{*+.$^\\|?])/gi, '\\$1'), 'i');

    e.target.value = e.target.value.replace(regex, convertEmojees[s])
  }







  setTimeout(() => {
    this.setState({PostText:this.state.PostText.substring(0, 500)})

  }, 20);


 

if(e.target.value.length >499){
    if(e.keyCode != 8 || (!e.keyCode === 17 &&  e.keyCode === 65  ) ){

      
    e.preventDefault()

    this.setState({PostText:this.state.PostText.substring(0, 500)})
    }
    
    
         }
      
}
  
Post(){
this.setState({PostLoading:true})

const {PostText,PostLoading} =this.state


if(PostText.length < 501 && PostText.length > 5){
  this.setState({PostLoading:true})


}
else if(PostText.length > 500){

  this.setState({PostLoading:false,openDialog:true,DialogTitle:"You have exceeded character limits in your post, Please write a post with in less than 500 characters (character includes spaces also) ", DialogTitle:"Character Limit Exceeded!"})

}
else if(PostText.length > 500){

  this.setState({PostLoading:false,openDialog:true,DialogTitle:"You have exceeded character limits in your post, Please write a post with in less than 500 characters (character includes spaces also) ", DialogTitle:"Character Limit Exceeded!"})

}



}




  render() {

    const {Name , ProfileIMG,PostText,PostLoading} =this.state
    
    return (
      <div >

    <Dialog
          open={this.state.openDialog}
          keepMounted
          onClose={this.handleCloseDialog}
          aria-labelledby="alert-dialog-slide-title"
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle id="alert-dialog-slide-title">
            {this.state.DialogTitle}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
            {this.state.DialogDescription}  
            </DialogContentText>
          </DialogContent>
          <DialogActions>
        
            <Button onClick={this.handleCloseDialog} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>



             <img  className="PostAvatar" src={ProfileIMG ? ProfileIMG : undefined} />
             <p style={{float:'right',position:'relative'}}>{PostText.length} / 500</p>
     <Paper className="PostDiv">
     <textarea   ref={c => (this.textarea = c)} onPaste={this.keyDownHandler} value={PostText} onKeyDown={this.keyDownHandler} onChange={this.handleChange("PostText")} className="PostTextArea"></textarea>
     </Paper>
     <Button  variant="fab" className="attachicon" >
<Attach /></Button>

<div style={{margin:'5px',position:'relative',width:71,float:'right'}}>
          <Button
            variant="contained"
            color="primary"
            
            disabled={PostLoading}
            onClick={this.Post}
          >
            Post 
          </Button>
          {PostLoading && <CircularProgress size={24} className="buttonProgress" />}
        </div>

<br/><br/>
<Divider style={{width:'100%',marginTop:'20px'}}/>








    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>

    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>
    <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    <p>Hello</p>





    </div>
      
    );
  }
}

export default Home;
