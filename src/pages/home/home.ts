import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Joke } from '../../models/joke';
import { JokeServiceProvider } from '../../providers/joke-service/joke-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  joke: Joke;
  constructor(public navCtrl: NavController,
              private jokeService: JokeServiceProvider) {
    this.jokeService.getRandomJoke().subscribe(randomJoke => {
      this.joke = randomJoke;
    });
  }

  getAnother(){
    this.jokeService.getRandomJoke().subscribe(randomJoke => {
      this.joke = randomJoke;
    });
  }
}
