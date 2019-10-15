import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import * as firebase from 'firebase'

var database = firebase.database();

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user
  currentSession
  categoriesLoop =[]
  data
  currentUser
  currentSessionId
  userProfile = []
  currentState : boolean                          /////Comment out when done
  rootRef = database.ref().child("Categories")
  constructor(public router : Router) { }

  // Logging users in to the app
  login(email, password){
    return firebase.auth().signInWithEmailAndPassword(email, password).then((result)=>{
      //this.currentSessionId = result.user.uid
      //this.user = firebase.auth().currentUser;
     // console.log(this.user);
    //this.currentSession
    this.setCurrentSession(firebase.auth())
    //this.user = this.currentSession.currentUser
      //console.log(this.user);
      
      this.currentState = true
     return result
    }).catch((error) => {
      var errorMessage = error.message;
        console.log(errorMessage)
    return error
    });
  }

  //Adding new users to the database
  register(email, password, name, /** age, gender, */ username){
    return firebase.auth().createUserWithEmailAndPassword(email, password).then((data) =>{
      
      let userEmail = email;
      let userName = name;
      // let userAge = age;
      // let userGender = gender;
      let usersUsername = username;
      let userID = data.user.uid;
      this.currentSessionId = data.user.uid
      console.log(userID)
      console.log(usersUsername)
      database.ref().child("Users/" + userID).update({
        email: userEmail,
        displayName: userName,
        // age: userAge,
        // gender: userGender,
        username: usersUsername
      })
      //this.setCurrentSession(firebase.auth())
      this.currentState = true
      return data
     }).catch((error) => {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       console.log(errorMessage)
       // ...
       return error
     })
  }
  
   //Allowing users to reset their password
   passwordReset(emailAddress){
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log("Email has been sent")
    }).catch((error) => {
      // An error happened.
      console.log(error)
    });
  }

  //Function : Routing logged out users to the login page
  checkState(){
    if(!this.currentState){
     this.router.navigate(['/login'])
    }
  }

  returnState(){
    return this.currentState
  }

  setCurrentSession(user){
    console.log("running");
    var uid
    if (user !== null){
      uid = user.currentUser.uid;
      this.user = user.currentUser
      console.log(uid);
      
      var userRoot = firebase.database().ref("Users").child(uid)
      userRoot.once("value", snap => {
        console.log(userRoot);
        let values = snap.val()
          console.log(values["displayName"]);
          console.log(values["email"]);
          console.log(values["username"]);
          this.userProfile.push({
          key: snap.key,
          displayName : values["displayName"],
          email : values["email"],
          username: values["username"]
          })
      })
      
      
    }
     this.currentSessionId = uid
     console.log(uid);
     console.log(user);
     console.log(this.user);
     
  }

  readCurrentSession(){
    console.log(this.user);
    return this.user
  }

  returnUserProfile(){
    console.log(this.userProfile);
    return this.userProfile
  }
}


 