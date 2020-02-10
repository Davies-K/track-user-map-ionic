import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';

import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation'; 

import {Device } from '@ionic-native/device/ngx';
import * as firebase from 'Firebase'


declare var google: any;



@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  //watch position
  // myMarker = null;
 
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  startPosition: any;
  originPosition: string;
  destinationPosition: string;
  ref = firebase.database().ref('geolocations/');
  // directionsDisplay = new google.maps.DirectionsRenderer();

  watchPos;


  anyAdress:any;

	  options : GeolocationOptions;
  currentPos : Geoposition;

  latitude: number = 0;
  longitude: number = 0;
  geo: any;

	loading:any;
 // service = new google.maps.places.AutocompleteService(); 

 markers = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,
   private geolocation : Geolocation, public loadingCtrl: LoadingController, 
   private device: Device,
   public toastCtrl : ToastController) {
    

    this.ref.on('value', resp => {
      this.deleteMarkers();
      snapshotToArray(resp).forEach(data => {
        if(data.uuid !== 'john') {
          let image = 'assets/police/car-police-front-02-512.png';
          
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        } else {
          let image = 'assets/police/pol.png';
          let updatelocation = new google.maps.LatLng(data.latitude,data.longitude);
          this.addMarker(updatelocation,image);
          this.setMapOnAll(this.map);
        }
      });
    });
   	  
      // this.loading.present();
      // this.getUserPosition();
 		}

  getLocation(){
       this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
      
      });
      
       this.getUserPosition();
       
       // watch user's position
      
  }

    getUserPosition(){

     

      

    this.options = {
      enableHighAccuracy : true,

      maximumAge: 3000, 
      timeout: 10000,
      

    };

   
    
    this.loading.present();
    this.geolocation.getCurrentPosition(this.options).then((pos : Geoposition) => {
      this.currentPos = pos; 
      this.startPosition = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
      
      console.log("position:", this.startPosition)

    const mapOptions = {
      zoom: 18,
      center: this.startPosition,
      disableDefaultUI: true,
      enableHighAccuracy : true,
      
      
    }

    this.map = new google.maps.Map(document.getElementById('map'),mapOptions);
    // this.directionsDisplay.setMap(this.map);

    let watch = this.geolocation.watchPosition();
     watch.subscribe((data) => {

      this.deleteMarkers();
    let updatelocation = new google.maps.LatLng(data.coords.latitude,data.coords.longitude);
    this.updateGeolocation('john', data.coords.latitude,data.coords.longitude);
    
    let image = 'assets/police/car-police-front-02-512.png';
    this.addMarker(updatelocation,image);
    this.setMapOnAll(this.map);


  });

    
    
    
    
    
      console.log(pos);
     this.loading.dismiss();
      this.getAddress(pos.coords.latitude,pos.coords.longitude);
    },(err : PositionError)=>{
        console.log("error : " + err.message);
        this.loading.dismiss();
        this.toastCtrl.create({
          message: "Error",
          duration: 15000
        }).present();
       // return this.options;

    });

    

    
  }

  addMarker(location, image) {
    let marker = new google.maps.Marker({
      position: location,
      map: this.map,
      icon: image,
      
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  
  clearMarkers() {
    this.setMapOnAll(null);
  }


  deleteMarkers() {
    this.clearMarkers();
    this.markers = [];
  }

  updateGeolocation(uuid, lat, lng) {
    if(localStorage.getItem('mykey')) {
      firebase.database().ref('geolocations/'+localStorage.getItem('mykey')).set({
        uuid: uuid,
        latitude: lat,
        longitude : lng
      });
    } else {
      let newData = this.ref.push();
      newData.set({
        uuid: uuid,
        latitude: lat,
        longitude: lng
      });
      localStorage.setItem('mykey', newData.key);
    }
  }

 

//   showPosition(position) {
//     this.myMarker = new google.maps.Marker({
//        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
//        map: new google.maps.Map(document.getElementById("map")),
//        icon: 'img/icons/myicon.png'
//    });
//  }

//  // change marker location everytime position is updated
// watchSuccess(position) {
//   var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//   const marker = new google.maps.Marker({
      
//     position: latLng,
//     map: this.map,
    
//   });
//   // set marker position
//   marker.setPosition(latLng);
// }
 
   
  getAddress(lat,long){
    let latLng = new google.maps.LatLng(lat, long);
    let geocoder = new google.maps.Geocoder;
    var request = {
      latLng: latLng,
    };
    geocoder.geocode(request, (results, status)=>{
   	//console.log(JSON.parse(results));
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[1]) {
        	console.log(results[1]);
          this.anyAdress= results[1].formatted_address;;
        }
          if (results[0]) {
        	console.log(results[0]);


          // this.autocomplete.query = results[1].formatted_address;
          //   for (let i = 0; i < results[0].address_components.length; i++) {
          //     for (let b = 0; b < results[0].address_components[i].types.length; b++) {
          //       if (results[0].address_components[i].types[b] == "locality") {
          //           //this is the object you are looking for
          //         this.address_data.city = results[0].address_components[i].long_name;
          //         break;
          //           }
          //       else if (results[0].address_components[i].types[b] == "administrative_area_level_1") {
          //               //this is the object you are looking for
          //         this.address_data.state = results[0].address_components[i].long_name;
          //         break;
          //           }

          //       else if (results[0].address_components[i].types[b] == "postal_code") {
          //           //this is the object you are looking for
          //           this.address_data.zip_code = results[0].address_components[i].long_name;
          //           break;
          //       }
                    
          //     }
          //   }
            } else {
              console.log("Results not available");
            }
          }
          else {
            console.log("Geocoder failed due to: ", status);
          }
        });
    }
    

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocationPage');
  }

}

export const snapshotToArray = snapshot => {
  let returnArr = [];

  snapshot.forEach(childSnapshot => {
      let item = childSnapshot.val();
      item.key = childSnapshot.key;
      returnArr.push(item);
  });

  return returnArr;
};
