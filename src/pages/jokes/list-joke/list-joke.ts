import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Joke} from '../../../models/joke';
import {JokeServiceProvider} from '../../../providers/joke-service/joke-service';


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
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider) {

  }

  jokeSelected(joke: Joke) {
    console.log('joke', joke);
  }

  ionViewWillEnter() {
    this.jokeService.getJokes().subscribe(jokes => {
      this.jokes = jokes;
    });
  }

}
