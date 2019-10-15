import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { QuizResultsService } from '../quiz-results.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-show-results-scores',
  templateUrl: './show-results-scores.page.html',
  styleUrls: ['./show-results-scores.page.scss'],
})
export class ShowResultsScoresPage implements OnInit {
  userId
  categoryCode
  gameScores = []
  constructor(public router : ActivatedRoute, public resultsService : QuizResultsService, public userService : UserService) {
    this.userId = this.userService.readCurrentSession()
    
  }

  ngOnInit() {
    console.log(this.userId)
    this.categoryCode = this.router.snapshot.paramMap.get('key')
    this.gameScores = this.resultsService.fetchScores(this.userId, this.categoryCode)
    console.log(this.gameScores)
  }

}
