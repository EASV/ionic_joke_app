import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { JokeServiceProvider } from '../providers/joke-service/joke-service';
import { CreateJokePage } from '../pages/jokes/create-joke/create-joke';
import {ListJokePage} from '../pages/jokes/list-joke/list-joke';
import {DetailsJokePage} from '../pages/jokes/details-joke/details-joke';
import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {LocalNotifications} from '@ionic-native/local-notifications';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyB_c8Dcml_XXsYk6tyXIDoeOcEFChVnqyI",
    authDomain: "jokedb-79881.firebaseapp.com",
    databaseURL: "https://jokedb-79881.firebaseio.com",
    projectId: "jokedb-79881",
    storageBucket: "jokedb-79881.appspot.com",
    messagingSenderId: "636285680558"
  }
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreateJokePage,
    ListJokePage,
    DetailsJokePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreateJokePage,
    ListJokePage,
    DetailsJokePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    JokeServiceProvider,
    LocalNotifications
  ]
})
export class AppModule {}
