import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../main/main';
import { SignupPage } from '../signup/signup';

import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  username = '';
  password = '';

  constructor(public navCtrl: NavController ,public http: Http,public toastCtrl: ToastController,public navParams: NavParams) {
    this.http = http;
    this.navCtrl = navCtrl;

  }

  signIn(){
    var link = 'http://myartema.com/spb/login.php';
    var myData = JSON.stringify({username : this.username,password : this.password});

    this.http.post(link, myData)
    .subscribe( data => {
      var response = JSON.parse(data["_body"]);

      if(response.success == 1){
        let toast = this.toastCtrl.create({
          message: response.message,
          duration: 1000,
          position: 'bottom'
        });

        toast.onDidDismiss(() => {
          console.log('Dismissed toast');
          //close page
          this.navCtrl.setRoot(MainPage,{id:response.id_user});
        });

        toast.present();
      }
      else{
        this.createSimpleToast(response.message,4000);
      }

    }, error => {
      console.log(error);
    });

  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  createSimpleToast(string:string,time:number){
    let toast = this.toastCtrl.create({
      message: string,
      duration: time,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
    });

    toast.present();
  }
}
