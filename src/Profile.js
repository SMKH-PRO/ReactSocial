import React, { Component } from 'react';
import './Profile.css';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AppBar from '@material-ui/core/AppBar';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Follow from '@material-ui/icons/PersonAdd';
import Person from '@material-ui/icons/Person';

import Edit from '@material-ui/icons/Edit';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';


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
    coverIMG:'./cover.jpg',
    ProfileIMG:'file:///C:/Users/SPLIT%20x2/Desktop/create-react-app-boiler-plate-master/src/profile.jpg'
  }
  
  }

 

  handleChange = (event, value) => {
    this.setState({ value });
  };nn

  
  render() {
    const { value } = this.state;

    
    return (
      
      <div >
      <Card  style={{borderRadius:'0px'}}>
      <CardActionArea style={{width:'100% '}}>
     
        <img className="ProfileCover" src={this.state.ProfileIMG} />
        <CardContent > 
        <Avatar  className="UserProfilePic"  alt="Profile PIC" src={{uri:this.state.ProfileIMG}} / >
      
        <br/>
        <br/>

          <Typography gutterBottom variant="headline" component="h2">
            Lizard
          </Typography>
          <Typography component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
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
