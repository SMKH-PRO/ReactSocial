import React, { Component } from 'react';

import * as firebase from 'firebase';
import Paper from '@material-ui/core/Paper';

class Home extends Component {


  constructor(props){
    super(props)
  this.state ={

  }
  this.FunctionBeforeRender = this.FunctionBeforeRender.bind(this)
  }

  componentDidMount(){

    this.FunctionBeforeRender()
    
    }
    

FunctionBeforeRender(){
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in.

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
    
    return (
      <div>
     <Paper style={{padding:'10px'}}>
   <h1>HOME PAGE !!!!</h1>
     
   <br/><br/><br/><br/><br/><br/><br/>

     </Paper>
    </div>
      
    );
  }
}

export default Home;
