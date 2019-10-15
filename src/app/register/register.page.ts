import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import {FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  name; age; username; email; gender; password; confirmPassword; 
  registrationForm
  emailPattern= "[a-zA-Z0-9-_.+#$!=%^&*/?]+[@][a-zA-Z0-9-]+[.][a-zA-Z0-9]+"
  namePattern = "^(?=.*\[A-Z])(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"
  agePattern = "^(?=.*\[0-9]).{2}$"
  usernamePattern = "^(?=.*\[a-z])(?=.*\[A-Z]).{2,}$"  //Add ability to have username having whatever structure user desires
  passwordPattern = "^(?=.*\[0-9])(?=.*\[a-z])(?=.*\[A-Z])(?=.*\[@#$!%^&*,.<>]).{8,}$"
  

  constructor(public userService : UserService, formBuilder: FormBuilder, public route: Router, public alertController: AlertController, public toastController: ToastController) {
   
    this.registrationForm = formBuilder.group({
      name: [this.name, [Validators.compose(
        [Validators.required, Validators.pattern(this.namePattern)]
      )]],
      // age: [this.age, [Validators.compose(
      //   [Validators.required, Validators.pattern(this.agePattern)]
      // )]],
      // gender: [this.gender, Validators.required],
      email: [this.email, [Validators.compose(
        [Validators.required, Validators.pattern(this.emailPattern)]
      )]],
      username: [this.username, Validators.compose(
        [Validators.required, Validators.pattern(this.usernamePattern)]
      )],
      password: [this.password,Validators.compose(
        [Validators.required, Validators.pattern(this.passwordPattern)]
      )],
      confirmPassword: [this.confirmPassword, Validators.required]
    })
  }

  ////   Allllowee
////    !#$%^&_-=+
  addGender(event){
    this.gender = event.detail.value
    console.log(this.gender)
  }

  addUser(){
    //this.registrationForm.get('email').setValue(this.email);


    this.email = this.registrationForm.get('email').value
    this.name = this.registrationForm.get('name').value
    // this.age = this.registrationForm.get('age').value
    this.username = this.registrationForm.get('username').value
    this.password = this.registrationForm.get('password').value
    this.confirmPassword = this.registrationForm.get('confirmPassword').value
    // console.log("Your email : " + this.email)
    // console.log("Your name : " + this.name)
    //console.log("Your age: " + this.age)
    //console.log("Your username : " + this.username)
    // console.log("Your password : " + this.password)
    if(this.password === this.confirmPassword){
      this.userService.register(this.email, this.password, this.name, /**this.age, this.gender, */ this.username).then((data)=>{
      console.log(data)
          if(data.operationType === "signIn"){
            console.log("signed in")
            let userId = data.user.uid
            console.log("Current user : " + userId)
            this.userService.setCurrentSession(userId)
            this.route.navigate(["/home", userId])
            this.presentToast()
          }
        }).catch((error) => {
          console.log(error)
        })
    }else if(this.password !== this.confirmPassword){
      this.loadPasswordAlert()
    }
  

  }


  async loadPasswordAlert(){
      const alert = await this.alertController.create({
        header: 'Alert',
        subHeader: 'Error',
        message: 'Passwords don\'t match',
        buttons: ['OK']
      });
  
      await alert.present();
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'You have been registered',
      duration: 2000,
      color: "primary"
    });
    toast.present();
  }
  ngOnInit() {
    
  }

}
