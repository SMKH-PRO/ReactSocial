import React, { Component } from 'react';

import axios from 'axios';
import * as firebase from 'firebase';

  export function GetAndSetIP(){

    axios({
      
      url: 'https://www.kashan-haider.com/ReactSocial/ipinfo.php',
      method:'GET',
      headers:{'Content-Type':'application/x-www-form-urlencoded'},
      
  }).then((res)=>{
   // console.log(res.data)

    
    let IP= res.data.ip;


    let date = new Date();


    let HourlyTime= date.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric'})
  
  
  
    let HourMinute= date.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric',minute:'numeric'})
  
  
  
    let OnlyDate= date.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})
  
    let FullTime= date.toLocaleDateString('en-PK', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour:'numeric',minute:'numeric',second:'numeric'})
  
  
  
    let OnlyTime = date.toLocaleTimeString()
  
  

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {

    firebase.database().ref(`USERDETAILS/${user.uid}/IPDETAILS/${IP.replace(/\./g,'x')}/${HourlyTime}/${HourMinute}/${window.location.pathname}/${FullTime}`).set({Date: OnlyDate+"    ", Time:OnlyTime,Page: window.location.pathname}).then(()=>{
  // alert("Done")
     }).catch((err)=>{console.log(err); 
       //alert("Arror") 
     })

    }
  })
  

    
  })

  }
  


 