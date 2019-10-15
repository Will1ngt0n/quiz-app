import { Component, OnInit } from '@angular/core';
import { QuizResultsService } from '../quiz-results.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-results',
  templateUrl: './show-results.page.html',
  styleUrls: ['./show-results.page.scss'],
})
export class ShowResultsPage implements OnInit {
  userId
  userResults = []
  constructor(public resultService : QuizResultsService, public userService : UserService) {
    this.userService.checkState()
    this.userId = this.userService.readCurrentSession()
  //   this.resultService.fetchResults()
    this.userResults =  this.resultService.fetchUserResults(this.userId)
  }

  ngOnInit() {
  }

}
