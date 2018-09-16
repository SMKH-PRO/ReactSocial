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

  this.handleChange = this.handleChange.bind(this)
  this.keyDownHandler =   this.keyDownHandler.bind(this)
  }

  componentDidMount(){

    this.FunctionBeforeRender()
    
    }
    

    handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
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

  setTimeout(() => {
    this.setState({PostText:this.state.PostText.substring(0, 500)})

  }, 20);


  if((this.state.PostText.match(new RegExp("\n", "g")) || []).length >2 ){

    e.preventDefault()

  }

if(e.target.value.length >499){
    if(e.keyCode != 8){

      
    e.preventDefault()

    this.setState({PostText:this.state.PostText.substring(0, 500)})
    }
    
    
         }
      
}
  
  render() {

    const {Name , ProfileIMG,PostText} =this.state
    
    return (
      <div >
             <img  className="PostAvatar" src={ProfileIMG ? ProfileIMG : false} />

     <Paper className="PostDiv">
     <textarea onPaste={this.keyDownHandler} value={PostText} onKeyDown={this.keyDownHandler} onChange={this.handleChange("PostText")} className="PostTextArea"></textarea>
     </Paper>

<p style={{float:'right'}}>{PostText.length} / 500</p>











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
