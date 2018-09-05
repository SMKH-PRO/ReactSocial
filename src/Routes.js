import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import App from './App';
import Home from './Home';
import Signin from './signin';



const Paths = () => (
    <Router>
      <div>
        <Route exact path="/" component={Signin}/>
        <Route exact path="/Home" component={Home}/>
    
      </div>
    </Router>
  )

  export default Paths;
