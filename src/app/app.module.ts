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
    IonicStorageModule.forRoot()
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
    JokeServiceProvider
  ]
})
export class AppModule {}
