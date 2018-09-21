import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
import {ModalController} from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { ToastController } from 'ionic-angular';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
    selector: 'page-calculator',
    templateUrl: 'calculator.html'
})
export class CalculatorPage {
    result = '';
    
     hisTory =[this.result];
    constructor(public navCtrl: NavController, private vibration: Vibration,private modalCtrl: ModalController,private toastCtrl: ToastController) {//,private screenOrientation: ScreenOrientation) {
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    }
    // vibrate() {
    //     this.vibration.vibrate(5000);
    // }

    btnClicked(btn) {
        if (btn == 'C') {
            this.result = '';
            this.vibration.vibrate(30);
            
        }
        else {

            this.result += btn;
            this.vibration.vibrate(30);
        }
    }

    equalsTo(btn) {
        btn == '=';
        this.vibration.vibrate(30);
        var regex =/^\s*([-+]?)(\d+)(?:\s*([-+*\/])\s*((?:\s[-+])?\d+)\s*)+$/;
        var numberBeforeCalculation = this.result;
        if(!regex.test(numberBeforeCalculation)){
            // alert("wrong input");
            let toast = this.toastCtrl.create({
                message: 'wrong input',
                duration: 3000,
                position: 'bottom',
                
              });
              toast.present();
        }
        else{
        this.result = eval(this.result);
        this.hisTory.push(numberBeforeCalculation + '=' + this.result);
        }
    }

    back(btn) {
        this.vibration.vibrate(30);
        var value = this.result.length;
        if(value = this.result.length){
            this.result = this.result.substr(0, value - 1);
        }
        else{
            this.result='';
        }
        
    }

    history(btn: 'history'){
        
        for(var i=0;i<this.hisTory.length;i++){
            console.log(this.hisTory[i]);
        }  
    }
    modalCreate(){
        //const calculation = this.hisTory[this.result];
        const modal = this.modalCtrl.create(ModalPage,{data: this.hisTory});
        this.vibration.vibrate(30);
        modal.present();
    }
    
}
