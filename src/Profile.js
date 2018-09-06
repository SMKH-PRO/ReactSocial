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
    ProfileIMG:'https://raw.githubusercontent.com/SMKH-PRO/ReactSocial/master/src/profile.jpg'
  }
  
  }

 

  handleChange = (event, value) => {
    this.setState({ value });
  };

  
  render() {
    const { value } = this.state;

    
    return (
      
      <div >
      <Card  style={{borderRadius:'0px'}}>
     
      <BPImage className="BPCover" src={this.state.coverIMG} caption="Profile Picture Of This User" >
 
        <img  className="ProfileCover" src={this.state.coverIMG} />

</BPImage>



        <BPImage src={this.state.ProfileIMG} caption="Profile Picture Of This User" >
        <Avatar  className="UserProfilePic"  alt="Profile PIC" src={this.state.ProfileIMG}  / >
        </BPImage>
     <CardContent > 
      
      
          <Typography className="UserName" gutterBottom variant="headline" component="h2">
Kashan Haider   
       </Typography>
       <Typography  component="p">
loremipsum
       </Typography>
          <br/>
          <ExpansionPanel className="AboutUser">
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography className="UserBioData">About</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div>
         <List>
         <ListItem>
          <Avatar>
            <HomeIcon />
          </Avatar>
          <ListItemText primary="Lives In" secondary="Karachi, Pakistan" />
        </ListItem>
        
        <ListItem>
          <Avatar>
            <AgeIcon />
          </Avatar>
          <ListItemText primary="Age" secondary="17 Years Old" />
        </ListItem>
        <ListItem>
          <Avatar>
            <GenderIcon />
          </Avatar>
          <ListItemText primary="Gender" secondary="Male" />
        </ListItem>
        
      </List>

           </div>

        </ExpansionPanelDetails>
      </ExpansionPanel>
      <Divider  />

        </CardContent>

      <CardActions>
      <Button title="Chat" variant="fab" color="primary" aria-label="Chat" >
        <ChatIcon />
      </Button>
        <Button title="Follow" variant="fab" style={{background:'#2196f3',color:'white'}} aria-label="Add" >
        <Follow />
      </Button>
      <Button  title="Edit" variant="fab" color="primary" aria-label="Edit" >
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
        
        {value === 0 && <TabContainer>Item One


          <ol>

            <li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li><li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li> <li>wow</li>
          </ol>
        </TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>}
        {value === 2 && <TabContainer>Item Three</TabContainer>}
        
      </div>
{/*Profile tabs ends above*/}
      </div>
    );
  }
}

export default Profile;
