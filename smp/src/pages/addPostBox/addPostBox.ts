import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ToastController } from 'ionic-angular';
import { MainPage } from '../main/main';

@Component({
  selector: 'page-addPostBox',
  templateUrl: 'addPostBox.html'
})
export class AddPostBoxPage {

  data:any = {};
  post_box_id='';
  name='';

  constructor(public navCtrl: NavController ,public http: Http,public toastCtrl: ToastController,public navParams: NavParams) {

    this.data.id = this.navParams.get('id');
    this.http = http;
    this.navCtrl = navCtrl;
  }

  addPostBox(){
      var link = 'http://myartema.com/spb/addPostBox.php';
      var myData = JSON.stringify({id : this.data.id ,postBoxId : this.post_box_id,name : this.name});

      this.http.post(link, myData)
      .subscribe( data => {
        var response = JSON.parse(data["_body"]);

        if(response.success == 1){
          let toast = this.toastCtrl.create({
            message: response.message,
            duration: 2000,
            position: 'bottom'
          });

          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
            //close page
            this.navCtrl.pop();

            this.navCtrl.setRoot(MainPage,{id:this.data.id,refresh:true});
          });

          toast.present();
        }
        else{
          this.createSimpleToast("Error " + response.message,4000);
        }

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
