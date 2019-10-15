import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'showResultsScores'
})
export class ShowResultsScoresPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
