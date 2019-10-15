import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TouchSequence } from 'selenium-webdriver';
import { QuizResultsService } from '../quiz-results.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-show-specific-results',
  templateUrl: './show-specific-results.page.html',
  styleUrls: ['./show-specific-results.page.scss'],
})
export class ShowSpecificResultsPage implements OnInit {
  gameId
  gameResults
  userId
  categoryCode 
  constructor(public route : ActivatedRoute, public ResultsService : QuizResultsService, public userService : UserService) {
    this.userId = this.userService.readCurrentSession()
  }

  ngOnInit() {
    this.gameId = this.route.snapshot.paramMap.get('key')
    //this.gameResults = this.ResultsService.fetchSpecificResults(this.userId, this.categoryCode, this.gameId)
  }

}
