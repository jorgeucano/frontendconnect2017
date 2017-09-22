import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/first';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { PushNotificationsService } from 'angular2-notifications-lite';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'app';

  user$: Observable<firebase.User>;
  userName: string;
  photoURL: string;
  items: FirebaseListObservable<any[]>;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private pushNotificationsService: PushNotificationsService
  ) {
    this.user$ = afAuth.authState;
    this.photoURL = '';
    this.items = db.list('photos');
  }

  send() {
    const options = {
      body : 'Demo time',
      icon: 'http://frontend-con.io/wp-content/uploads/2017/03/frontend-logo.png',
      tag: 'tag',
      data: 'some data',
      renotify: true,
      silent: false,
      vibrate: [1, 2, 3, 4]
    };

    this.pushNotificationsService.create(`Welcome ${this.userName}`, options).subscribe(function (a) {
        return console.log(a);
    });

  }

  ngOnInit() {
    this.pushNotificationsService.requestPermission();
    this.subscribeuser$();
  }

  subscribeuser$() {
    this.user$.subscribe({
      next : (v) => {
        if (v !== undefined) {
          const opts: any = {
            query: {
              orderByChild: 'xid',
              equalTo: v.uid
            }
          };
          this.db.object(`/photos/`, opts).first().subscribe(x => {
            if (x.$exists()) {
              console.log('exist');
            }else {
              console.log(`NOT exist`);
              this.items.push( { xid: v.uid, photoURL: v.photoURL});
            }
            this.userName = v.displayName;
            this.send();
          });
        }
      }
    });
  }

  login() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }


}
