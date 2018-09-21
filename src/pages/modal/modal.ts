import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';


@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  historyy=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController,private vibration: Vibration) {
  }

  ionViewDidLoad() {
    const data = this.navParams.get('data');
    //console.log(data);
    this.historyy = data;
  }
  onClose(){
    this.vibration.vibrate(30);
    this.viewCtrl.dismiss();
  }

}
