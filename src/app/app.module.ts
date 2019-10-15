import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule} from '@angular/forms'
import {ReactiveFormsModule } from '@angular/forms'

//Extras
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import * as firebase from 'firebase';
import { ShowResultsScoresPipe } from './show-results-scores.pipe'

var firebaseConfig = {
  apiKey: "AIzaSyDaBpSdcz4SWlaAzZPGkL74tENDCkvkLVg",
    authDomain: "myrealquizzer.firebaseapp.com",
    databaseURL: "https://myrealquizzer.firebaseio.com",
    projectId: "myrealquizzer",
    storageBucket: "",
    messagingSenderId: "603600692858",
    appId: "1:603600692858:web:31ee70f84c903177"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [AppComponent, ShowResultsScoresPipe],
  entryComponents: [],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    StatusBar,
    File, FileChooser,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
