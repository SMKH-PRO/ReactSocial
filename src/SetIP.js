import React, { Component } from 'react';

import axios from 'axios';
import * as firebase from 'firebase';

  export function GetAndSetIP(){

    axios({
      
      url: 'https://www.mutualfilesharing.com/ReactSocial/ipinfo.php',
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


        firebase.database().ref(`USERDETAILS/${user.uid}/Pic/`).once('value',(pic)=>{
let userpic = pic.val()
console.log(userpic)
let URLvalidator = /^(?:(?:(?:https?|https):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i


if(user.photoURL !== userpic &&  URLvalidator.test(userpic)){
console.log("auth ", user.photoURL ," Database: ", userpic)
user.updateProfile({
photoURL : userpic

}).then(()=>{
  console.log("We found a different profile in database and authenticator! so thats why we changed Updated the profile picture in the authenticator")
})

}

        })

    firebase.database().ref(`USERDETAILS/${user.uid}/IPDETAILS/${IP.replace(/\./g,'x')}/${HourlyTime}/${HourMinute}/${window.location.pathname}/${FullTime}`).set({Date: OnlyDate+"    ", Time:OnlyTime,Page: window.location.pathname}).then(()=>{
  // alert("Done")
     }).catch((err)=>{console.log(err); 
       //alert("Arror") 
     })

    }
  })
  

    
  })

  }
  


 