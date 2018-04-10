import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-options',
  templateUrl: 'options.html'
})
export class OptionsPage {
  data:any = {};
  username = '';
  password = '';

  constructor(public navCtrl: NavController ,public http: Http,public toastCtrl: ToastController,public alertCtrl: AlertController,public navParams: NavParams) {
    this.http = http;
    this.navCtrl = navCtrl;
    this.data.user = this.navParams.get('user');

    var link = 'http://myartema.com/spb/getOptions.php';
    var myData = JSON.stringify({user : this.data.user});

    this.http.post(link, myData)
    .subscribe( data => {
      this.updateOptions(JSON.parse(data["_body"]));
    }, error => {
      console.log(error);
    });


  }

    updateOptions(rep:JSON){
      this.data.notifications = +rep.notifications;
      this.data.notifications_email = +rep.notifications_email;
    }


    updateNotifications(){
      var link = 'http://myartema.com/spb/updateNotifications.php';
      var myData = JSON.stringify({user : this.data.user});
      this.http.post(link, myData)
      .subscribe( data => {
        this.updateOptions(JSON.parse(data["_body"]));
      }, error => {
        console.log(error);
      });
    }

    updateNotificationsEmail(){
      var link = 'http://myartema.com/spb/updateNotificationsEmail.php';
      var myData = JSON.stringify({user : this.data.user});
      this.http.post(link, myData)
      .subscribe( data => {
        this.updateOptions(JSON.parse(data["_body"]));
      }, error => {
        console.log(error);
      });
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
