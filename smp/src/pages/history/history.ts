import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class HistoryPage {
  data:any = {};
  mailBoxName:any;

  constructor(public navCtrl: NavController ,public http: Http,public toastCtrl: ToastController,public alertCtrl: AlertController,public navParams: NavParams) {
    this.data.id = this.navParams.get('id');
    this.data.user = this.navParams.get('user');
    this.http = http;
    this.navCtrl = navCtrl;
    this.mailBoxName = this.navParams.get('mailBoxName');


    var link2 = 'http://myartema.com/spb/clearNotifications.php';
    var myData2 = JSON.stringify({id : this.data.id,user:this.data.user});

    this.http.post(link2, myData2)
    .subscribe( data => {

    }, error => {
      console.log(error);
    });


    var link = 'http://myartema.com/spb/getHistory.php';
    var myData = JSON.stringify({id : this.data.id});

    this.http.post(link, myData)
    .subscribe( data => {
      this.data.responses = JSON.parse(data["_body"]);

      this.data.keys = Object.keys(this.data.responses);
    }, error => {
      console.log(error);
    });

    this.data.user = this.navParams.get('parent').refreshBox();
  }


  refresh(){
    var link = 'http://myartema.com/spb/getHistory.php';
    var myData = JSON.stringify({id : this.data.id});

    this.http.post(link, myData)
    .subscribe( data => {
      this.data.responses = JSON.parse(data["_body"]);

      this.data.keys = Object.keys(this.data.responses);
    }, error => {
      console.log(error);
    });

    var link3 = 'http://myartema.com/spb/clearNotifications.php';
    var myData3 = JSON.stringify({id : this.data.id,user:this.data.user});

    this.http.post(link3, myData3)
    .subscribe( data => {

    }, error => {
      console.log(error);
    });

  }

  deleteHistory(iddel:number){
      let alert = this.alertCtrl.create({
        title: 'Effacer historique',
        message: 'êtes vous sûr de vouloir éffacer ?',
        buttons: [
          {
            text: 'Non',
            role: 'cancel',
            handler: () => {

            }
          },
          {
            text: 'Oui',
            handler: () => {
              var link = 'http://myartema.com/spb/deleteHistory.php';
              var myData = JSON.stringify({iddel : iddel,id:this.data.id});

              this.http.post(link, myData)
              .subscribe( data => {
                var rep = JSON.parse(data["_body"]);

                this.data.responses = JSON.parse(data["_body"]);

                this.data.keys = Object.keys(this.data.responses);
              }, error => {
                console.log(error);
              });
            }
          }
        ]
      });
      alert.present();
  }


}
