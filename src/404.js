import React, { Component } from 'react';

import * as firebase from 'firebase';

class App extends Component {


  constructor(props){
    super(props)
  this.state ={
Time: 10
  }
  
  }

  
  componentDidMount(){

  


    setInterval(()=>{
       

        this.setState({Time: this.state.Time -1})

        if(this.state.Time == 0){
            this.setState({Time:  10})

            this.props.history.push('/Home')


        }

    },1000)



  }
  
  render() {
    
    return (
      <div>
<div style={{position: 'relative'}}>

    <div style={{position: 'absolute',    top: '50%',     left: '50%',     transform: 'translate(-50%, 10%)'}}>
    
    
<br/>

    <p style={{color:'red',fontSize:12}}> Redirecting you back to Home Page in {this.state.Time} seconds....</p>
    <h1>404 Not Found!</h1>
    <p style={{fontSize:10,color:"gray"}}>The Page You Are Trying To Access Doesn't Exist Or Maybe Temporarily Unavailable!</p>


    </div>
    </div>
     
    </div>
      
    );
  }
}

export default App;
