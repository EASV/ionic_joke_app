import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Joke} from '../../../models/joke';
import {JokeServiceProvider} from '../../../providers/joke-service/joke-service';

/**
 * Generated class for the DetailsJokePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-details-joke',
  templateUrl: 'details-joke.html',
})
export class DetailsJokePage {

  joke: Joke;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider) {
    this.joke = this.navParams.get('joke');
    console.log('joke', this.joke);
  }

  delete() {
    this.jokeService.delete(this.joke.id)
      .subscribe(jokes => {
        console.log('deleted', jokes);
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsJokePage');
  }

}
