import { Injectable } from '@angular/core';
import {Joke} from '../../models/joke';
import {Observable} from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import {AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';

@Injectable()
export class JokeServiceProvider {

  private jokesCollection: AngularFirestoreCollection<Joke>;
  constructor(private storage: Storage,
              private db: AngularFirestore) {
    this.jokesCollection = this.db.collection<Joke>('jokes');

  }

  //key   | value
  //jokes | joke[]
  //snakes| snake[]
  //time | 'now'

  update(joke: Joke) :Observable<Joke> {
    return Observable.create( observable => {
      this.getJokes().subscribe( allJokes => {
        var jokeFound = allJokes.find(j => j.id === joke.id);
        if(jokeFound) {
          jokeFound.punchline = joke.punchline;
          jokeFound.setup = joke.setup;
          this.setJokes(allJokes).subscribe(() => {
            observable.next(jokeFound);
            observable.complete();
          });
        }
      })

    });
  }

  delete(id: string) :Observable<Joke[]> {
    return Observable.create( observable => {
      this.getJokes().subscribe( allJokes => {
        let allJokesExceptId = allJokes.filter(j => j.id !== id);
        this.setJokes(allJokesExceptId).subscribe(() => {
          observable.next(allJokesExceptId);
          observable.complete();
        });
      });
    });
  }

  getFilteredJokes(searchText: string): Observable<Joke[]> {
    return Observable.create( observable => {
      this.getJokes().subscribe(allJokes => {
        if(searchText && searchText.length > 0){
          let filteredJokes = allJokes
            .filter(j => j.punchline.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
              j.setup.toLowerCase().indexOf(searchText.toLowerCase()) > -1);
          observable.next(filteredJokes);
        }
        else{
          observable.next(allJokes);
        }

        observable.complete();
      });
    });
  }

  getJokes() :Observable<Joke[]> {
    return this.jokesCollection
      .valueChanges();

    /*return Observable.create( observable => {
      this.storage.get('jokes').then(jokes => {
        if(!jokes){
          jokes = [
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
          this.setJokes(jokes).subscribe(jokesSaved => {
            observable.next(jokesSaved);
            observable.complete();
          });
        }
        else {
          observable.next(jokes);
          observable.complete();
        }

      });
   })*/
  }

  setJokes(jokes: Joke[]): Observable<Joke[]> {
    return Observable.create( observable => {
      this.storage.set('jokes', jokes).then(storedJokes => {
        observable.next(storedJokes);
        observable.complete();
      });
    });
  }

  getRandomJoke() :Observable<Joke> {
    return Observable.create( observable => {
      this.getJokes().subscribe(jokes => {
        let random = Math.floor(Math.random() * (jokes.length));
        observable.next(jokes[random]);
        observable.complete();
      })

    })
  }

  createJoke(joke: Joke): Observable<Joke> {
    return Observable.create( observable => {
      /*this.getJokes().subscribe(jokesDB => {
        joke.id = Date.now().toString();
        jokesDB.push(joke);
        this.setJokes(jokesDB).subscribe(() => {
          observable.next(joke);
          observable.complete();
        });
      });*/
      this.jokesCollection.add(joke)
        .then(jokeReturned => {
          console.log(jokeReturned);
        });
    });
  }
}
