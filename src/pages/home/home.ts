import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Joke } from '../../models/joke';
import { JokeServiceProvider } from '../../providers/joke-service/joke-service';
import {LocalNotifications} from '@ionic-native/local-notifications';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  joke: Joke;
  constructor(public navCtrl: NavController,
              private jokeService: JokeServiceProvider,
              private localNotifications: LocalNotifications) {
    this.jokeService.getRandomJoke().subscribe(randomJoke => {
      this.joke = randomJoke;
    });
  }

  getAnother(){
    this.jokeService.getRandomJoke().subscribe(randomJoke => {
      this.joke = randomJoke;
      this.localNotifications.schedule({
        text: 'Delayed ILocalNotification',
        at: new Date(new Date().getTime() + 3600),
        led: 'FF0000',
        sound: null
      });
    });
  }
}
