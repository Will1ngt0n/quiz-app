import { Component } from '@angular/core';
import { UserService } from '../user.service';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router'
import { MenuController } from '@ionic/angular'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  logo
  myId
  currentState
  constructor(public userService : UserService, public route : ActivatedRoute, public router : Router, public menu: MenuController) {
    this.logo = "assets\\images\\quizzer.jpg"
    //this.currentState = this.userService.returnState()
    //console.log(this.currentState)
    // this.userService.checkState()
    // this.userService.readCurrentSession()
    this.returnUser()
  }
  returnUser(){
    this.userService.returnUserProfile()
  }
  showResults(){
    this.router.navigate(['/show-results'])
  }
ngOnInit(){
  this.myId = this.route.snapshot.paramMap.get('key');
  console.log(this.myId);
}

}
