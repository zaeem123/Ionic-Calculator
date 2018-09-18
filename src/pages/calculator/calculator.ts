import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Vibration } from '@ionic-native/vibration';
//import { ScreenOrientation } from '@ionic-native/screen-orientation';


@Component({
    selector: 'page-calculator',
    templateUrl: 'calculator.html'
})
export class CalculatorPage {
    result = '';
    resultArray=[];
    
     hisTory =[this.result];
    constructor(public navCtrl: NavController, private vibration: Vibration) {//,private screenOrientation: ScreenOrientation) {
        //this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

    }
    vibrate() {
        this.vibration.vibrate(5000);
    }

    btnClicked(btn) {
        if (btn == 'C') {
            this.result = '';
                        
        }
        
        else {
            this.result += btn;
           
        }
    }
    equalsTo(btn) {
        btn == '=';
        var numberBeforeCalculation = this.result;
        this.result = eval(this.result);
        this.hisTory.push(numberBeforeCalculation + '=' + this.result);
        
    }

    back(btn) {
        var value = this.result.length;
        if(value = this.result.length){
            this.result = this.result.substr(0, value - 1);
        }
        else{
            this.result='';
        }
        
    }

    history(btn){
        
        for(var i=0;i<this.hisTory.length;i++){
            console.log(this.hisTory[i]);
        }  
    }
    
}
