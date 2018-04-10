import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MainPage } from '../pages/main/main';
import { HistoryPage } from '../pages/history/history';
import { SignupPage } from '../pages/signup/signup';
import { OptionsPage } from '../pages/options/options';
import { AddPostBoxPage } from '../pages/addPostBox/addPostBox';

import { HttpModule } from '@angular/http'

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MainPage,
    HistoryPage,
    AddPostBoxPage,
    HomePage,
    SignupPage,
    OptionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MainPage,
    HistoryPage,
    AddPostBoxPage,
    HomePage,
    SignupPage,
    OptionsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
