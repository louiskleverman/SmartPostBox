import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { AddPostBoxPage } from '../addPostBox/addPostBox';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { OptionsPage } from '../options/options';

@Component({
  selector: 'page-main',
  templateUrl: 'main.html'
})
export class MainPage {
  data:any = {};
  lapage = null;
  constructor(public navCtrl: NavController ,public http: Http,public alertCtrl: AlertController,public navParams: NavParams) {

    this.data.id = this.navParams.get('id');
    this.http = http;

    var link = 'http://myartema.com/spb/getPostBoxes.php';
    var myData = JSON.stringify({id : this.data.id});

    this.http.post(link, myData)
    .subscribe( data => {

      this.data.response = JSON.parse(data["_body"]);

    }, error => {
      console.log(error);
    });


  }

  disconnect(){
    let alert = this.alertCtrl.create({
      title: 'Deconnecter',
      message: 'êtes vous sûr de vouloir vous déconnecter ?',
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
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
    alert.present();
  }

  showHistory(num:string){
    //alert("changing to " + num );
    this.navCtrl.push(HistoryPage,{id:num,user:this.data.id});
  }

  addPostBox(){
    //alert("clicked");
    //this.navCtrl.push(AddPostBoxPage,{id:this.data.id});
    this.navCtrl.push(AddPostBoxPage,{id:this.data.id});
  }

  options(){
    this.navCtrl.push(OptionsPage,{user:this.data.id});
  }

  deletePostBox(id:number,user:number){
      let alert = this.alertCtrl.create({
        title: 'Effacer Post Box',
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
              var link = 'http://myartema.com/spb/deletePostBox.php';
              var myData = JSON.stringify({id : id,user:user});

              this.http.post(link, myData)
              .subscribe( data => {

                this.data.response = JSON.parse(data["_body"]);

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
