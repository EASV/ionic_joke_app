import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Joke} from '../../../models/joke';
import {JokeServiceProvider} from '../../../providers/joke-service/joke-service';
import {DetailsJokePage} from '../details-joke/details-joke';

/**
 * Generated class for the ListJokePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-list-joke',
  templateUrl: 'list-joke.html',
})
export class ListJokePage {

  jokes: Joke[];
  searchText: string;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider) {

  }

  search(){
    this.jokeService.getFilteredJokes(this.searchText)
      .subscribe(filteredJokes => {
        this.jokes = filteredJokes
      });

  }

  jokeSelected(joke: Joke) {
    this.navCtrl.push(DetailsJokePage, {joke: joke})
  }

  ionViewWillEnter() {
    this.jokeService
      .getJokes()
      .subscribe(jokes => {
            this.jokes = jokes;
            console.log('jokes: ', this.jokes);
        });
  }

}
