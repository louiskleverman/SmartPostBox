import { Component } from '@angular/core';
import { NavController } from 'ionic-angular'
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }



  ionViewDidLoad() {
    setTimeout(() => {
        this.navCtrl.setRoot(LoginPage);
    }, 2500);

   }
}
