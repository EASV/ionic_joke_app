import { Component } from '@angular/core';
import {AlertController, NavController, NavParams, ToastController} from 'ionic-angular';
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
              private jokeService: JokeServiceProvider,
              private toastCtrl: ToastController,
              private alertctrl: AlertController) {
    this.joke = this.navParams.get('joke');
    console.log('joke', this.joke);
  }

  delete() {
    let alert = this.alertctrl.create({
      title: 'Sure?',
      message: 'Are you sure you want to delete the Joke?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('cancelled');
        }
      }, {
        text: 'Delete',
        handler: () => {
          //Ask if he wants to delete!!
          this.jokeService.delete(this.joke.id)
            .subscribe(() => {
              this.navCtrl.pop().then(() => {
                let toast = this.toastCtrl.create({
                  message: 'Joke Deleted',
                  duration: 3000,
                  position: 'bottom'
                });
                toast.present();
              });
            });
        }
      }]
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsJokePage');
  }

}
