import { Injectable } from '@angular/core';
import * as firebase from 'firebase'


var database = firebase.database();
@Injectable({
  providedIn: 'root'
})
export class QuizResultsService {
  playedCategories = []
  playedGames = []
  scores = []
  specificResults = []

  userScores= []

  results=[]
  constructor() { }
  submitToFirebase(gameScore, gameArray, categoryCode, userId){
    console.log(userId);
    console.log(gameScore);
    console.log(gameArray);
    console.log(categoryCode);
    var newPostKey = firebase.database().ref().child('Results/' + userId + "/").push().key;
    console.log(newPostKey)
    console.log(gameScore)
    console.log(gameArray)
    console.log(categoryCode)
    for(let i = 0; i< gameArray.length; i++){
      database.ref().child('Results/' + userId + "/"  +  categoryCode + "/" + newPostKey + "/" + gameArray[i].gameQuestions).update({
      userAnswer : gameArray[i].usersAnswer,
      userBooleanScore : gameArray[i].scoreBoolean,
      correctAnswer: gameArray[i].correctAnswer
      });
  }

    database.ref().child('Scores/' + userId + "/" + categoryCode+ "/" + newPostKey + "/" ).update({usersScore : gameScore})


  }


  fetchUserResultss(userId){
    this.clearArray(this.playedCategories)
    
    console.log(userId)
    
    var rootRef = firebase.database().ref().child("Results/" + userId)
    rootRef.on('child_added', snap => {
      
      let playedCategories = snap.val()
      let key = snap.key
     // let gameId = snap.child("userAnswer").val()
      //console.log(gameId);
      
      this.playedCategories.push({
        key: key
      })
      console.log(this.playedCategories);
    })
      //if(this.playedCategories.length > 0)
      for(let i = 0; i < this.playedCategories.length; i++){
        
        let game = this.playedCategories[i].key
        console.log(game)
        let rootRef2 = firebase.database().ref().child("Results/" + userId + "/" + game)
        //let gameId = snap.child("userAnswer").val()
        rootRef2.on('child_added', snapshot2 =>{
          let game2 = snapshot2.key
          console.log(game2)
          
          
          let scoreRef = firebase.database().ref().child("Scores/" + userId + "/" + game + "/" + game2)
          this.clearArray(this.playedGames)
          scoreRef.on('child_added', snapGame => {
            
            let score = snapGame.val()
            console.log(score)

            this.playedGames.push({
              key: this.playedCategories[i].key,
              category: this.playedCategories[i].key,
              game: game2,
              score: score
            })
          })
        
          
          //for(let j =0; j < this.)
        })
console.log(game);
          console.log(this.playedGames);
      }
      console.log(this.playedGames)

      //console.log(playedCategories)
      //console.log(key)
      //console.log(child)
    
  
    console.log(rootRef);

    
    
    return this.playedCategories
  }
  fetchUserResults(userId){
    console.log(userId);
    
    var rootRef = firebase.database().ref().child("Results/" + userId)
    rootRef.on('child_added', snap => {
      this.results.push(snap.key)
    })
    
    return this.results
  }

  //Second to be almost close to being done
  fetchUserResultso(userId){
    this.clearArray(this.playedCategories)
    console.log(userId)
    let gameKeys
    var rootRef = firebase.database().ref().child("Results/" + userId)
    rootRef.on('child_added', snap => {
      
      let playedCategories = snap.val()
      let gameId = snap.child("Cars013").val()
      let key = snap.key
     // let gameId = snap.child("userAnswer").val()
      console.log(key);
      
      this.playedCategories.push({
        key: key
      })

    
    console.log(this.playedCategories);
    console.log(playedCategories);
    console.log(gameId);
    
      //if(this.playedCategories.length > 0)
      for(let i = 0; i < this.playedCategories.length; i++){
        let game = this.playedCategories[i].key

        rootRef.on('value', snap => {
      
          let playedCategories = snap.val()
          let gameId = snap.child(game).val()
          let key = Object.values(playedCategories)                      ///////Works
          gameKeys = Object.keys(key[i])                              //////Works
         // let gameId = snap.child("userAnswer").val()
          console.log(key);
          console.log(gameKeys);
          
        
        console.log(this.playedCategories);
        console.log(playedCategories);
        console.log(gameId);
        
          //if(this.playedCategories.length > 0)
          for(let i = 0; i < this.playedCategories.length; i++){
            let game = this.playedCategories[i].key
          }
      })

      rootRef.on('value', snapResults => {
        console.log(gameKeys);
        let results 
        for(let g = 0; g < gameKeys.length; g++){
          results = snapResults.child(game + "/" + gameKeys[g]).val()
          this.scores.push({
            results: results
          })
        }

        let pResults
        for(let q in results){
          console.log(q);
          for(let p = 0; p < q.length; p++){
            console.log(q);
            pResults = snapResults.child(game )
            this.specificResults.push({
              key: q,
              answer: Object.values(key[q])
            })
        }
        }
        
        console.log(this.specificResults);
        
      })
      }
  })

  
  
    return this.playedCategories
  }

  fetchPlayedCategoriess(userId){
    this.clearArray(this.playedCategories)
    console.log(userId)
    var rootRef = firebase.database().ref().child("Results/" + userId)
    console.log(rootRef)
    rootRef.on('child_added', snap => {
      let keys = snap.val()
      let key = snap.key
      console.log(keys)
      console.log(key)
      let categorySet = snap.val()
      console.log(categorySet)
      
        this.playedCategories.push({
          Category : key
        })
        console.log(this.playedCategories)
      
    })
    return this.playedCategories
  }

  fetchScores(userId, categoryCode){
    this.clearArray(this.playedCategories)
    console.log(userId)
    var rootRef = firebase.database().ref().child("Scores/" + userId + "/" + categoryCode)
    rootRef.once('value', (snapshot) => {
      let keys = snapshot.val()
      console.log(keys)
      for(let key in keys){
       
        this.scores.push({
        key: key,
        score: Object.values(keys[key])
      })
      }
      
     // console.log(key)
      console.log(this.scores);
     
    })
    return this.scores
  }
  /////////////////////////////////////////////////////////////////////////////////////////////
  clearArray(array){
    for(let i=0; i < array.length; i++){array.splice(i)}
  }
}
