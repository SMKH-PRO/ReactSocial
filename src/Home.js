import React, { Component } from 'react';
import './Home.css'
import * as firebase from 'firebase';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';


class Home extends Component {


  constructor(props){
    super(props)
  this.state ={
    Name:'',
    ProfileIMG:'',
    PostText:''

  }
  this.FunctionBeforeRender = this.FunctionBeforeRender.bind(this)
  }

  componentDidMount(){

    this.FunctionBeforeRender()
    
    }
    

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
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


  
  render() {

    const {Name , ProfileIMG} =this.state
    
    return (
      <div >
     <Paper className="PostDiv">
     
    <img className="PostAvatar" src={ProfileIMG ? ProfileIMG : false} />
   <textarea className="PostTextArea"></textarea>

     </Paper>
    </div>
      
    );
  }
}

export default Home;
