import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import MoonLoader from 'react-spinners/MoonLoader';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { BPImage } from 'bigpicture-react';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import ScaleLoading from 'react-spinners/ScaleLoader';
import './EditProfile.css';
import Dialog from '@material-ui/core/Dialog';
import Tooltip from '@material-ui/core/Tooltip';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import axios from 'axios';
import CheckIcon from '@material-ui/icons/Check';
import Edit from '@material-ui/icons/Edit';
import { GetAndSetIP } from './SetIP';

import * as firebase from 'firebase';
import { Divider } from '@material-ui/core';
function Transition(props) {
    return <Slide direction="up" {...props} />;
  }
class ProfileEdit extends Component {


  constructor(props){
    super(props)
  this.state ={
      coverIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/loadingcover.gif',
    ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/loadingprofile.gif',

    loading1:true,
    success1:false,
    
    loading3:false,
    success3:false,

    loading2:true,
    success2:false,

    openDialog:false,
    DialogTitle: '',
    DialogDescription:'',
    OldCover:'',
    OldProfile:'',
    FName: '',
    Name:'',
    LName:'',
    DisableNameChange:true,
    Bio:'',
    BioError:false,
    BioLessThan50:false,
    Age:'',
    City:'',
    Country:'',
    Gender:'',
    IP:'',
   MainLoading:true,
    
  }
  
  this.ChangeCover = this.ChangeCover.bind(this)
  this.RunBeforeRender = this.RunBeforeRender.bind(this)
  this.SetData = this.SetData.bind(this)

  }

  componentDidMount(){
    this.ChangeCover()
   this.RunBeforeRender()
   

  }



  RunBeforeRender(){
    axios({
        
      url: 'https://www.kashan-haider.com/ReactSocial/ipinfo.php',
      method:'GET',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      
  }).then((res)=>{
   // console.log(res.data)

    
    this.setState({IP:res.data.ip})

    
  })
  axios({
        
    url: 'https://geoip-db.com/json/',
    method:'GET',
    headers:{'Content-Type':'application/x-www-form-urlencoded'},
    
}).then((res)=>{

 // console.log(res)

  this.setState({Country:  res.data.country_name, City: res.data.city  })

  
 
})




    if(firebase.auth().currentUser != null){
  

    let username = firebase.auth().currentUser.displayName


    if(username != null ){
this.setState({Name: username,DisableNameChange:true,FName:username.substr(0,username.indexOf(' ')), LName:username.substr(username.indexOf(' ')+1,username.length)
,
})

firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}`).on('value',(data)=>{

if(data.hasChild("Name")){

 // console.log(data.child("Name").val())
}
else{
  this.setState({DisableNameChange:false})

  firebase.auth().currentUser.updateProfile({
 
    displayName:null,
  })

}
})


      
    }else{
      
      this.setState({DisableNameChange:false})
    }

    


    firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/`).once('value',(data)=>{

if(data.hasChild("Age")){
  this.setState({Age:data.child("Age").val()})
}
if(data.hasChild("Bio")){
  this.setState({Bio:data.child("Bio").val()})
}
if(data.hasChild("LivesIn")){
  this.setState({LivesIn:data.child("LivesIn").val()})
}
if(data.hasChild("Gender")){
  this.setState({Gender:data.child("Gender").val()})
}
if(data.hasChild("City")){
  this.setState({City:data.child("City").val()})
}
if(data.hasChild("Country")){
  this.setState({Country:data.child("Country").val()})
}
    }).then(()=>{

      this.setState({MainLoading:false})
    })

  }else{
    setTimeout(() => {
      this.RunBeforeRender()

    }, 500);
  }

}
  ChangeCover(){
    if(localStorage.getItem("Cover") != null){
      this.setState({coverIMG: localStorage.getItem("Cover")})
    }
    if(localStorage.getItem("Profile") != null){
      this.setState({ProfileIMG: localStorage.getItem("Profile")})
    }

   // console.log("CHange Cover started")
if(firebase.auth().currentUser !== null){

if(firebase.auth().currentUser.photoURL !== null && firebase.auth().currentUser.photoURL != "null"){

this.setState({ProfileIMG:firebase.auth().currentUser.photoURL,OldProfile:firebase.auth().currentUser.photoURL})
localStorage.setItem("Profile", firebase.auth().currentUser.photoURL)
setTimeout(() => {
  this.setState({loading2:false})

}, 100);

}else{
  localStorage.setItem("Profile",'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg' )

  this.setState({OldProfile:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg',
  ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg',})
  setTimeout(() => {
    this.setState({loading2:false})
  
  }, 100);
}

firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/cover`).on('value',(data)=>{

  if(data.val() != null){
    

this.setState({coverIMG: data.val(),OldCover:data.val(),loading1:false})
localStorage.setItem("Cover",data.val())
  }
else{
  localStorage.setItem("Cover","https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg")
  

  this.setState({OldCover:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg',coverIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg',loading1:false})
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



    let file = e.target.files[0];
                
        let filedata= new FormData();
    filedata.append('file',file);
    
        
      
    console.log("function upload file started")
    
    
    
     // console.log(file)
     // console.log("file type : "+file.type)
    
      
      
    
    if(e.target.value.length >1){
       
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
else{console.log("No Files Were Selected!")}




}





handleButtonChange = (e) => {



    let file = e.target.files[0];
                
        let filedata= new FormData();
    filedata.append('file',file);
    
        
      
    console.log("function upload file started")
    
    
    
     // console.log(file)
     // console.log("file type : "+file.type)
    
      
      
    
    if(e.target.value.length >1){
       
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
else{console.log("No Files Were Selected!")}




}






handleButtonChange2 = (e) => {



  let file = e.target.files[0];
              
      let filedata= new FormData();
  filedata.append('file',file);
  
      
    
  console.log("function upload file started")
  
  
  
   // console.log(file)
   // console.log("file type : "+file.type)
  
    
    
  
  if(e.target.value.length >1){
     
    if(file.type == "image/png"  || file.type == "image/jpeg"  || file.type == "image/gif"  || file.type == "image/jpg"){
  
      this.setState({loading2:true,success2:false})
  //console.log(file)
  
  let reader = new FileReader();

  reader.onload =  (e)=> {
      // get loaded data and render thumbnail.
 //console.log('READER: ', e.target.result)

 this.setState({ProfileIMG: e.target.result})
  };



  reader.readAsDataURL(file)




  axios({
      
      url: 'https://www.kashan-haider.com/ReactSocial/UploadedFiles/upload.php',
      method:'POST',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      data: filedata
  }).then((res)=>{
      //console.log(res)
      //var uploadedfilename = res.data.files[0];
        let  downloadURL = '//reactsocial.kashan-haider.com/UploadedFiles/' +encodeURIComponent(file.name.trim()) ;
        let user = firebase.auth().currentUser;

        user.updateProfile({
 
          photoURL:downloadURL
        }).then(()=> {
          // Update successful.
          this.setState({loading2:false,success2:true,ProfileIMG:downloadURL})

        }).catch((err)=> {
          // An error happened.
          this.setState({   ProfileIMG:this.state.OldProfile,
            loading2:false,success2:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' }); 
        });
  
  //console.log(downloadURL)


  }).catch((err)=>{
      
         // console.log(err)

          this.setState({      ProfileIMG:this.state.OldProfile,
loading2:false,success2:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' });        
  })
  
  
  
  }
  
  
  else{
      
      
      this.setState({ loading2:false,success2:false,openDialog: true, DialogDescription:'Please Choose An Image File Such As .JPG .PNG, Other Formats Are Restricted For Your Profile Profile!.',DialogTitle:'Invalid File Format!' });

  }//Else Ends here
    
    
    
}
else{console.log("No Files Were Selected!")}




}








handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  

  CheckBioLenght(e){

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
      
  
    if(this.state.Bio.length < 50 ){
      this.setState({BioLessThan50:true,BioError:true})
    }
    else if(this.state.Bio.length > 50  ){
      this.setState({BioLessThan50:false})
      if(this.state.Bio.length < 200){
this.setState({BioError:false})
      }
      else{
        this.setState({BioError:true})

      }

    }
    else if(this.state.Bio.length > 200 ){
      this.setState({BioError:true})

      console.log(this.state.Bio ,":", this.state.Bio.length)
    }
   
    else{
      this.setState({BioError:false})
    }  }, 10);



  }



  //; remove html tags
  SetData(){
    const { Age,Bio,LName,FName,LivesIn,Gender,BioError,BioLessThan50,City,Country,DisableNameChange,IP } = this.state;



  if(FName.length === 0  && DisableNameChange !== true){
    this.setState({openDialog: true, DialogDescription:"You forgot to write First Name!, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }
  else if(FName.length > 10  && DisableNameChange !== true){
    this.setState({openDialog: true, DialogDescription:"First Name Must Not Be Longer Than 10 Characters!" ,DialogTitle:'An Error Occurred!' });  
  }
  else if(FName.length < 3  && DisableNameChange !== true){
    this.setState({openDialog: true, DialogDescription:"First Name Must Not Be Shorter Than 3 Characters!" ,DialogTitle:'An Error Occurred!' });  
  }

  else if(LName.length === 0  && DisableNameChange !== true ){
    this.setState({openDialog: true, DialogDescription:"You forgot to write Last Name!, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }

  else if(LName.length > 10  && DisableNameChange !== true){
    this.setState({openDialog: true, DialogDescription:"Last Name Must Not Be Longer Than 10 Characters!" ,DialogTitle:'An Error Occurred!' });  
  }

  
  else if(LName.length < 3  && DisableNameChange !== true){
    this.setState({openDialog: true, DialogDescription:"Last Name Must Not Be Shorter Than 3 Characters!" ,DialogTitle:'An Error Occurred!' });  
  }

  else if(Bio.length === 0 ){
    this.setState({openDialog: true, DialogDescription:"You forgot to write Bio !, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }
  else if(Bio.length <50 ){
    this.setState({openDialog: true, DialogDescription:"You must write ''Bio'' With Atleast 50 Characters" ,DialogTitle:'An Error Occurred!' });
  }
  
  else if(Bio.length >200 ){
    this.setState({openDialog: true, DialogDescription:"Bio Must Be Shorter Than 200 Characters !, Character Limit Exceeded! " ,DialogTitle:'An Error Occurred!' });
  }
  else if(Country.length === 0 ){
    this.setState({openDialog: true, DialogDescription:"You forgot to write Country !, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }
  else if(Country.length > 30){
    this.setState({openDialog: true, DialogDescription:"Invalid Country Name, Character Limit Exceeded, \n If your country name has longer than 30 Characters, Please write shortname of your country For Example: Pakistan for 'Islamic Republic Of Pakistan' " ,DialogTitle:'An Error Occurred!' });  
  }
  else if(City.length === 0 ){
    this.setState({openDialog: true, DialogDescription:"You forgot to write City !, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }
  
  else if(City.length > 30){
    this.setState({openDialog: true, DialogDescription:"Invalid City Name, Character Limit Exceeded" ,DialogTitle:'An Error Occurred!' });  
  }
  else if(Age.length === 0 ){
    this.setState({openDialog: true, DialogDescription:"You forgot to write Age !, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }
  
else if(Age > 60){
  this.setState({openDialog: true, DialogDescription:"Age Must Not Be Greater Than 60, We Allow Users In The Age Of 13 to 60.!, If you doesnt comes between this age limit then you are not eligible to continue here.!" ,DialogTitle:'An Error Occurred!' });  
}
else if(Age < 13){
  this.setState({openDialog: true, DialogDescription:"Age Must Not Be Smaller Than 13, We Allow Users In The Age Of 13 to 60.!, If you doesnt comes between this age limit then you are not eligible to continue here.!" ,DialogTitle:'An Error Occurred!' });  
}


  else if(Gender == "" ){
    this.setState({openDialog: true, DialogDescription:"You forgot to Select Gender !, Please recheck the form before submitting!" ,DialogTitle:'An Error Occurred!' });
  }

  else{
    this.setState({loading3:true,success3:false})
    let date = new Date();
    let OnlyDate= date.toLocaleDateString('en-PK', {year: 'numeric', month: 'short', day: 'numeric'})
    let OnlyTime= date.toLocaleTimeString('en-PK',{hour: '2-digit', minute:'2-digit'})

    firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}`).update({
      Bio:Bio,
      Country:Country,
      City:City,
      Age:Age,
      Gender:Gender,
      EditedFromIP:IP,
      EditDate: OnlyDate,
      EditTime:OnlyTime
      
    }).then(()=>{

   

if( DisableNameChange !== true){
  firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/`).update({
    Name:FName+" "+LName, FName: FName, LName:LName}).then(()=>{

    
      firebase.auth().currentUser.updateProfile({
 
        displayName:FName+" "+LName,
        photoURL: this.state.ProfileIMG
      }).then(()=> {
        // Update successful.
        this.setState({loading3:false,success3:true})

      }).catch((err)=> {
        // An error happened.
        this.setState({   
          loading3:false,success3:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' }); 
      })
    })
      ;}
      else{
        this.setState({loading3:false,success3:true})

      }
    }).catch((err)=>{

      this.setState({   
        loading3:false,success3:false, openDialog: true, DialogDescription:err.toString(),DialogTitle:'An Error Occurred!' }); 
    })
  


    


  }
  
  
 


  }
  render() {
    const { loading1,loading3,success3, success1,loading2, success2,Age,Bio,Name,LivesIn,Gender,BioError,BioLessThan50,City,Country,FName,LName } = this.state;

    

    return (
      <div>
           <div className="center-div">
            <MoonLoader  sizeUnit={"px"} className="ProfileImageLoader" color="#2196f3" size={80}  loading={this.state.MainLoading} /></div>





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
















  <Card className="ProfileCard"  >
       
  <div > 
 <input onChange={this.handleButtonChange.bind(this)} style={{display:'none'}} className="UploadCoverBtn" accept="image/*" id="cover-file"  type="file" />
      <label htmlFor="cover-file">
    <Button  className="UploadCoverBtn" component="span"  variant="contained" color="secondary"  disabled={loading1} >             {success1 ? (<span><span>Cover Changed</span> <CheckIcon style={{maxHeight:10}}/></span> ): 'Change Cover Image'}
 </Button>{loading1 && <CircularProgress style={{marginRight:100,marginTop:'15px'}} className="UploadCoverBtn" size={24}  />}</label>  
     </div>
  <BPImage style={{ display: 'block'}} wow="Cover" className="BPCover" src={this.state.coverIMG} caption="Cover Picture Of This User" >
 
 <div style={{backgroundImage:`url(${this.state.coverIMG})`}} className="ProfileCover" ></div>
 </BPImage>
 





<div>
<input  onChange={this.handleButtonChange2.bind(this)} style={{display:'none'}}  accept="image/*" id="profile-file"  type="file" />
      <label htmlFor="profile-file">
<Button  component="span"  variant="fab" color="secondary"  disabled={loading2} className="UploadProfileBtn" color="primary">
            {success2 ? <CheckIcon /> : <Edit />}
          </Button></label>
     
          
</div>
<div style={{maxWidth:'100px'}}>


 <BPImage src={this.state.ProfileIMG} caption="Profile Picture Of This User" >
 <Avatar  className="UserProfilePic"  alt="Profile PIC" src={this.state.ProfileIMG}  / >
 </BPImage>
 </div>
 {loading2 && <CircularProgress className="LoadingNewProfile" size={68}  />}
        <CardContent>
          <Typography gutterBottom  component="span">
  
  
  {this.state.MainLoading ? (      <ScaleLoading  sizeUnit={"px"}  color="#2196f3" size={10}  loading={this.state.MainLoading} />
):(<span>
  { this.state.DisableNameChange ?(
    <Tooltip title="You can not change your name again, you already did once!.">
    <span>
    
    <TextField id="FullName" InputProps={{ readOnly: true, }} label="Name"  placeholder="FullName" value={this.state.Name} margin="normal" />
    </span>
  </Tooltip>
  ): (
    <span>
  <TextField id="FNAME"  onKeyDown={(e)=>{if(e.keyCode ==32){e.preventDefault()}}} label="First Name" placeholder="Cannot be changed later!" value={this.state.FName} onChange={this.handleChange('FName')} margin="normal" />

  <TextField id="LNAME"  onKeyDown={(e)=>{if(e.keyCode ==32){e.preventDefault()}}}  label="Last Name" placeholder="Cannot be changed later!" value={this.state.LName} onChange={this.handleChange('LName')} margin="normal" />
  {this.state.DisableNameChange ? '':<p style={{color:'red'}}>Name Cannot Be Changed Later!, Make Sure To Write Valid Name!.</p>}
  </span>
  
    )}   
    </span>
    )}
        
          </Typography>
          <Typography component="span">
         
          <TextField
          error={BioError}
          style={{width:'100%'}}
          id="textarea"
          label="Bio "
          rows="3"
          onPaste={this.CheckBioLenght.bind(this)}
          onKeyDown={this.CheckBioLenght.bind(this)}
          placeholder="Short Description About Your Self With Minimum 50 Characters And Maximum 200 Characters!."
          multiline
          onChange={this.handleChange('Bio')}
          value={Bio}
          disabled={this.state.MainLoading}
          margin="normal"
        />


       
       {BioLessThan50 ? ( <span> {BioError ? (<p style={{color:'red',float:'right'}}>{Bio.length} / 50 </p>):(<p style={{color:'green',float:'right'}}>{Bio.length} / 50 </p>)}</span>):
      
      (
        ( <span> {BioError ? (<p style={{color:'red',float:'right'}}>{Bio.length} / 200 </p>):(<p style={{color:'green',float:'right'}}>{Bio.length} / 200 </p>)}</span>)
      )}<br/>
          </Typography>
          <br/><br/><br/>
          <p style={{fontWeight:600}}>About </p>
          <Divider/>
          <TextField id="City"           disabled={this.state.MainLoading}
 label="Country"         
 placeholder="Country Where You Live!" value={Country} onChange={this.handleChange('Country')} margin="normal" />
 <TextField            disabled={this.state.MainLoading}
 id="City" label="City" placeholder="City Where You Live!" value={City} onChange={this.handleChange('City')} margin="normal" />
<br/>
<TextField id="Age" label="Age"              disabled={this.state.MainLoading}
        type="number"
 placeholder="i.e: 18" value={Age} min="13" inputMode="numeric" pattern="[0-9]" onChange={this.handleChange('Age')} margin="normal" /><br/>
 
 <TextField
           disabled={this.state.MainLoading}

          id="select-gender"
          select
          label="Select"
          value={this.state.Gender}
          onChange={this.handleChange('Gender')}
        
          helperText="Select Your Gender "
          margin="normal"
        >
            <MenuItem  value="Male">
              Male
            </MenuItem>
            <MenuItem value="Female">
              Female
            </MenuItem>
        </TextField>



        </CardContent>
      <CardActions style={{float:'right'}}>
      <div style={{margin:'5px',position:'relative',width: 200,float:'right'}}>

     <Button   className="SaveChanges" onClick={this.SetData}  variant="contained" color="primary"  disabled={loading3} >             {success3 ? (<span><span>Changes Saved</span> <CheckIcon style={{maxHeight:10}}/></span> ): 'Save Changes'}
 </Button>{loading3 && <CircularProgress className="buttonProgress"  size={24}  />}
</div>



      </CardActions>
    </Card>   

    <br  /><br  /><br  /><br  /><br  /><br  /><br  /><br  /><br  /><br  /><br  />
    </div>
      
    );
  }
}

export default ProfileEdit;

