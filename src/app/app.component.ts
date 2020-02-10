import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
// import { AuthService } from '../services/auth.service';

import * as firebase from 'firebase'





const config = {
  apiKey: "AIzaSyCJA9ThlrnXjWG_XcsdepzxGihjPmWN7sg",
    authDomain: "police-patrol-513dc.firebaseapp.com",
    databaseURL: "https://police-patrol-513dc.firebaseio.com",
    projectId: "police-patrol-513dc",
    storageBucket: "police-patrol-513dc.appspot.com",
    messagingSenderId: "227402738864"

};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = "LocationPage";

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}

