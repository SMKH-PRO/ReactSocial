import React, { Component } from 'react';
import './Profile.css';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Divider from '@material-ui/core/Divider';

import AppBar from '@material-ui/core/AppBar';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Follow from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';

import Edit from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';

import { BPImage } from 'bigpicture-react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import AgeIcon from '@material-ui/icons/AccessibilityNew';
import HomeIcon from '@material-ui/icons/Home';
import Loading from 'react-spinners/ScaleLoader';
import MoonLoader from 'react-spinners/MoonLoader';

import GenderIcon from '@material-ui/icons/Wc';
import * as firebase from 'firebase';













function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}






class Profile extends Component {


  constructor(props){
    super(props)
  this.state ={
    value: 0,
    coverIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg',
    ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg',
    loading:true,
    Name: '',
    nameloading:true,
    Bio:'',
    LivesIn:'',
    Age:'',
    Gender:'',
    City:'',
    Country:'',
    
    
  }
  this.ChangeCover = this.ChangeCover.bind(this)

  }





  componentDidMount(){
    this.ChangeCover();
  }









  ChangeCover(){



if(localStorage.getItem("Cover") != null){
  this.setState({coverIMG: localStorage.getItem("Cover")})
}
if(localStorage.getItem("Profile") != null){
  this.setState({ProfileIMG: localStorage.getItem("Profile")})
}
    console.log("CHange Cover started")
if(firebase.auth().currentUser !== null){

let username=  firebase.auth().currentUser.displayName;
if(username !== null){
  this.setState({Name: username,nameloading:false})
}

if(firebase.auth().currentUser.photoURL !== null && firebase.auth().currentUser.photoURL != "null"){

this.setState({ProfileIMG:firebase.auth().currentUser.photoURL})
localStorage.setItem("Profile", firebase.auth().currentUser.photoURL)
setTimeout(() => {
  this.setState({loading1:false})

}, 500);

}else{
  localStorage.setItem("Profile",'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg' )

  this.setState({ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg'})
  setTimeout(() => {
    this.setState({loading1:false})
  
  }, 500);
}
firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/`).on('value',(data)=>{
  if(data.child("Name").val() != null && data.child("Bio").val() != null && data.child("Country").val() && data.child("City").val()!= null && data.child("Age").val() != null && data.child("Gender").val() != null ){



    this.setState({
      Bio:data.child("Bio").val(),
      LivesIn:data.child("Country").val()+", "+data.child("City").val(),
      Age:data.child("Age").val(),
      Gender:data.child("Gender").val(),
      loading:false,
    })
  }else{
    console.log("Something Is Missing!",data.child("Gender").val(),data.child("Bio").val(),data.child("Age").val() )

    this.props.history.push('EditProfile')
    
  }

})



firebase.database().ref(`USERDETAILS/${firebase.auth().currentUser.uid}/cover`).on('value',(data)=>{

  if(data.val() != null){
this.setState({coverIMG: data.val()})
localStorage.setItem("Cover",data.val())
  }
else{
  localStorage.setItem("Cover","https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg")

  this.setState({coverIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/cover.jpg'})
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
 

  handleChange = (event, value) => {
    this.setState({ value });
  };

  
  render() {loading
    const { value,loading,Age,Bio,Name,LivesIn,Gender,City,Country } = this.state;

    const LoadingSpinner = (
      <Loading  sizeUnit={"px"}  color="#2196f3" size={10}  loading={this.state.loading} />
    )
    return (
      
      <div >
<div className="center-div">
            <MoonLoader  sizeUnit={"px"} className="ProfileImageLoader" color="#2196f3" size={80}  loading={this.state.loading} /></div>
      <Card  className="ProfileCard" style={{borderRadius:'0px'}}>
     
      <BPImage className="BPCover" src={this.state.coverIMG} caption={`Profile Cover Image Of ${this.state.Name}`}>
 
      <div style={{backgroundImage:`url(${this.state.coverIMG})`}} className="ProfileCover" ></div>
    
</BPImage>


<div style={{maxWidth:'100px'}}>
        <BPImage src={this.state.ProfileIMG} caption={`Profile Picture Of ${this.state.Name}`}>
        <Avatar  className="UserProfilePic"  alt="Profile PIC" src={this.state.ProfileIMG}  / >
        </BPImage>
        </div>
     <CardContent > 
      
      
          <Typography className="UserName" gutterBottom variant="headline" component="h2">
    {this.state.Name }       <Loading  sizeUnit={"px"}  color="#2196f3" size={10}  loading={this.state.nameloading} />

       </Typography>
       <Typography  component="p">
{this.state.bio} <Loading  sizeUnit={"px"} className="LoadingBio" color="#2196f3" size={10}  loading={this.state.loading} />
       </Typography>
          <br/>
          <ExpansionPanel className="AboutUser">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="UserBio">About</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div>
         <List>
         <ListItem>
          <Avatar>
            <HomeIcon />
          </Avatar>
          <ListItemText primary="Lives In" secondary={this.state.LivesIn  } />
        </ListItem>
        
        <ListItem>
          <Avatar>
            <AgeIcon />
          </Avatar>
          <ListItemText primary="Age" secondary={this.state.Age, LoadingSpinner} />
        </ListItem>
        <ListItem>
          <Avatar>
            <GenderIcon />
          </Avatar>
          <ListItemText primary="Gender" secondary={this.state.Gender, LoadingSpinner} />
        </ListItem>
        
      </List>

           </div>

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider  />

        </CardContent>

      <CardActions>
      <Button title="Chat" onClick={()=>{ console.log(Age,Bio,Name,Gender,City,Country) }} variant="fab" color="primary" aria-label="Chat" >
        <ChatIcon />
      </Button>
        <Button title="Follow" variant="fab" style={{background:'#2196f3',color:'white'}} aria-label="Add" >
        <Follow />
      </Button>
      <Button  onClick={()=>{      this.props.history.push('EditProfile')}} title="Edit" variant="fab" color="primary" aria-label="Edit" >
        <Edit />
      </Button>
      </CardActions>
    </Card>
{/*Profile Tabs Starts Here*/}

   
      <div >
        <AppBar position="static" style={{background:'#2196f3'}}>
        <center>
          <Tabs
            value={value}
            onChange={this.handleChange}
            scrollable
            scrollButtons="off"
            indicatorColor="primary"

          >
            <Tab  className="ProfileTab" label="Followers" icon={<Person style={{filter:'drop-shadow(0px 0px 1px black)'}} />} />
            <Tab  className="ProfileTab" label="Likes!" icon={<ThumbUp style={{filter:'drop-shadow(0px 0px 1px black)'}} />} />
            <Tab className="ProfileTab" label="Following" icon={<Follow style={{filter:'drop-shadow(0px 0px 1px black)'}} />} />
          </Tabs>
          </ center>
        </AppBar>
        
        {value === 0 && <TabContainer>


          {LoadingSpinner}
        </TabContainer>}
        {value === 1 && <TabContainer>
          {LoadingSpinner}

        </TabContainer>}
        {value === 2 && <TabContainer>

              {LoadingSpinner}
        </TabContainer>}
        
      </div>
{/*Profile tabs ends above*/}
      </div>
    );
  }
}

export default Profile;
