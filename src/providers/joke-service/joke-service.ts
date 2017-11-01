import { Injectable } from '@angular/core';
import {Joke} from '../../models/joke';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class JokeServiceProvider {

  jokes: Joke[];
  constructor(private storage: Storage) {
    this.jokes = [
      { id:'xyz',
        setup:'A horse walks into a bar',
        punchline: 'The bartender says why the long face' },
      { id:'zyx',
        setup:'Anton, my son, do you think I’m a bad mother?',
        punchline: 'My name is Paul.' },
      { id:'zzxx',
        setup:'What is the difference between a snowman and a snowwoman?',
        punchline: 'Snowballs.' }
    ];

  }

  getRandomJoke() :Observable<Joke> {
    let random = Math.floor(Math.random() * (this.jokes.length));
    return Observable.create( observable => {
      observable.next(this.jokes[random]);
      observable.complete();
    })
  }

  createJoke(joke: Joke): Observable<Joke> {
    return Observable.create( observable => {
      joke.id = Date.now().toString();
      this.jokes.push(joke);
      this.storage.set('jokes', this.jokes);
      observable.next(joke);
      observable.complete();
    });
  }
}
