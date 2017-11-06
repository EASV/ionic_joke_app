import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {JokeServiceProvider} from "../../providers/joke-service/joke-service";

/**
 * Generated class for the CreateJokePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-joke',
  templateUrl: 'create-joke.html',
})
export class CreateJokePage {

  setupProp = '';
  punchlineProp = '';
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private jokeService: JokeServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateJokePage');
  }

  create() {
    this.jokeService.createJoke({ setup: this.setupProp,
      punchline: this.punchlineProp})
      .subscribe(createdJoke => {
        this.setupProp = '';
        this.punchlineProp = '';
      });
  }

}
