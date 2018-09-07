import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BPImage } from 'bigpicture-react';
import Avatar from '@material-ui/core/Avatar';
import Link from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import './EditProfile.css';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import React, { Component } from 'react';
import CheckIcon from '@material-ui/icons/Check';

import * as firebase from 'firebase';
function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
class ProfileEdit extends Component {


  constructor(props){
    super(props)
  this.state ={
      coverIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg',
    ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg',
    loading1:true,
    success1:false,
    openDialog:false,
    DialogTitle: '',
    DialogDescription:'',
    OldCover:'',
    OldProfile:'',
  }
  
  this.ChangeCover = this.ChangeCover.bind(this)
  this.ChangeCover();
  }

  ChangeCover(){
    console.log("CHange Cover started")
if(firebase.auth().currentUser !== null){

if(firebase.auth().currentUser.photoURL !== null && firebase.auth().currentUser.photoURL != "null"){

this.setState({ProfileIMG:firebase.auth().currentUser.photoURL,OldProfile:firebase.auth().currentUser.photoURL})

setTimeout(() => {
  this.setState({loading1:false})

}, 500);

}else{

  this.setState({OldProfile:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg',})
  setTimeout(() => {
    this.setState({loading1:false})
  
  }, 500);
}

firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/cover`).on('value',(data)=>{

  if(data.val() != null){
this.setState({coverIMG: data.val(),OldCover:data.val()})
  }
else{
  this.setState({OldCover:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg'})
}
})
}
else{
  this.setState({loading1:true})
  setTimeout(() => {
    this.ChangeCover();
  }, 500);
}
  }

  handleButtonChange = (e) => {
    if (!this.state.loading) {
      this.setState(
        {
          success1: false,
          loading1: true,
        })
    }



    let file = e.target.files[0];
                
        let filedata= new FormData();
    filedata.append('file',file);
    
        
      
    console.log("function upload file started")
    
    
    
     // console.log(file)
     // console.log("file type : "+file.type)
    
      
      
    
    if(e.target.value != ""){
       
      if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
    
        this.setState({loading1:true,success1:false})
    //console.log(file)
    
    let reader = new FileReader();

    reader.onload =  (e)=> {
        // get loaded data and render thumbnail.
   console.log('READER: ', e.target.result)

   this.setState({coverIMG: e.target.result})
    };



    reader.readAsDataURL(file)




    axios({
        
        url: 'https://www.kashan-haider.com/ReactSocial/UploadedFiles/upload.php',
        method:'POST',
        headers:{'Content-Type':'application/x-www-form-urlencoded'},
        data: filedata
    }).then((res)=>{
        console.log(res)
        //var uploadedfilename = res.data.files[0];
          var downloadURL = '//reactsocial.kashan-haider.com/UploadedFiles/' +encodeURIComponent(file.name.trim()) ;
    
    
    console.log(downloadURL)

    firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/cover`).set(downloadURL).then(()=>{
      this.setState({loading1:false,success1:true,coverIMG:downloadURL})

    }).catch((err)=>{
      this.setState({   coverIMG:this.state.OldCover,
      loading1:false,success1:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' });  
    })
    }).catch((err)=>{
        
            console.log(err)

            this.setState({      coverIMG:this.state.OldCover,
loading1:false,success1:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' });        
    })
    
    
    
    }
    
    
    else{
        
        
        this.setState({ loading1:false,success1:false,openDialog: true, DialogDescription:'Please Choose An Image File Such As .JPG .PNG, Other Formats Are Restricted For Your Profile Cover!.',DialogTitle:'Invalid File Format!' });
 
    }//Else Ends here
      
      
      
}





}


handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };
  
  render() {
    const { loading1, success1 } = this.state;

    
    return (
      <div>





    <Dialog
          open={this.state.openDialog}
          TransitionComponent={Transition}
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
















  <Card >
       
  <BPImage className="BPCover" src={this.state.coverIMG} caption="Cover Picture Of This User" >
 
 <img  className="ProfileCover" src={this.state.coverIMG} /></BPImage>
 
 <div > 
 <input onChange={this.handleButtonChange.bind(this)} style={{display:'none'}} className="UploadCoverBtn" accept="image/*" id="cover-file"  type="file" />
      <label htmlFor="cover-file">
    <Button className="UploadCoverBtn" component="span"  variant="contained" color="secondary"  disabled={loading1} >             {success1 ? (<span><span>Cover Changed</span> <CheckIcon /></span> ): 'Change Cover Image'}
 </Button></label>  {loading1 && <CircularProgress style={{position:'absolute',right:100,marginTop:5}} className="UploadCoverBtn" size={24}  />}
     </div>





 <BPImage src={this.state.ProfileIMG} caption="Profile Picture Of This User" >
 <Avatar  className="UserProfilePic"  alt="Profile PIC" src={this.state.ProfileIMG}  / >
 </BPImage>
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>     
    </div>
      
    );
  }
}

export default ProfileEdit;

