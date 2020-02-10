import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';


import { Geolocation } from '@ionic-native/geolocation';
import {
 GoogleMaps,
 GoogleMap,
 GoogleMapsEvent,
 GoogleMapOptions,
 CameraPosition,
 MarkerOptions,
 Marker
} from '@ionic-native/google-maps';
import { NativeGeocoder, NativeGeocoderReverseResult, NativeGeocoderForwardResult } from '@ionic-native/native-geocoder';



import { firebaseConfig } from '../config';

import * as firebase from 'firebase';

import { Device } from '@ionic-native/device/ngx';

// import { AuthService } from '../services/auth.service';


@NgModule({
  declarations: [
    MyApp,
   
    
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
    // AngularFireModule.initializeApp(firebaseConfig.fire),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    // AuthService,
    NativeGeocoder,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Device
    // AngularFireAuth
  ]
})
export class AppModule {}
