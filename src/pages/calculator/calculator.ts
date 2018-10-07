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
    //result = '';
    calculator = {
        displayValue: '0',
        firstOperand: null,
        waitingForSecondOperand: false,
        operator: null,
        result : '',

      };
    
     hisTory =[this.calculator.result];
        
    constructor(public navCtrl: NavController, private vibration: Vibration,private modalCtrl: ModalController,private toastCtrl: ToastController) {//,private screenOrientation: ScreenOrientation) {
        
    }
  
    inputDigit(digit) {
        const { displayValue, waitingForSecondOperand,result } = this.calculator;
      
        if (waitingForSecondOperand === true) {
          this.calculator.displayValue = digit;
          this.calculator.waitingForSecondOperand = false;
          this.calculator.result = digit;
          this.vibration.vibrate(30);
          //this.hisTory.push(this.calculator.result);
        } else {
          this.calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
          this.calculator.result = result === '0' ? digit : result + digit;
          this.vibration.vibrate(30);
          //this.hisTory.push(this.calculator.result);
        }
      }

      inputDecimal(dot) {
        if (this.calculator.waitingForSecondOperand === true) return;
      
    
      if (!this.calculator.displayValue.includes(dot)) {
    
        this.calculator.displayValue += dot;
        this.calculator.result += dot
        this.vibration.vibrate(30);
        //this.hisTory.push(this.calculator.result);
      }
    }
    resetCalculator() {
        this.calculator.displayValue = '0';
        this.calculator.firstOperand = null;
        this.calculator.waitingForSecondOperand = false;
        this.calculator.operator = null;
        this.calculator.result = '';
        this.vibration.vibrate(30);
      }

    btnClicked(btn) {
        if (btn == 'C') {
            
            this.resetCalculator();
            this.vibration.vibrate(30);
            
        }
        else {

            this.vibration.vibrate(30);
        }
    }
    performCalculation = {
        '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
      
        '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
      
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
      
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
      
        '=': (firstOperand, secondOperand) => secondOperand
      };

    handleOperator(nextOperator) {
        const { firstOperand, displayValue, operator, result } = this.calculator
        const inputValue = parseFloat(displayValue);

        if (operator && this.calculator.waitingForSecondOperand) {
            this.calculator.operator = nextOperator;
            this.calculator.result = nextOperator + inputValue;
            //this.hisTory.push(this.calculator.result);
            return;
        }

        if (firstOperand == null) {
            this.calculator.firstOperand = inputValue;
            this.calculator.result = this.calculator.displayValue;
            //this.hisTory.push(this.calculator.result);

        } else if (operator) {
            const currentValue = firstOperand || 0;

            const result = this.performCalculation[operator](currentValue, inputValue);

            this.calculator.displayValue = String(result);
            this.calculator.firstOperand = result;
            this.calculator.result = currentValue + operator + inputValue + '=' + result;
            this.hisTory.push(this.calculator.result);
        }

        this.calculator.waitingForSecondOperand = true;
        this.calculator.operator = nextOperator;
    }
    backButton() {
        var value = this.calculator.displayValue.length;
        if (value = this.calculator.displayValue.length) {
            this.calculator.displayValue = this.calculator.displayValue.substr(0, value - 1);
        }
        else {
            this.calculator.displayValue = '0';
        }
    }

    // equalsTo(btn) {
    //     btn == '=';
    //     this.vibration.vibrate(30);
    //     var numberBeforeCalculation = this.result;
    //     this.result = eval(this.result);
    //     this.hisTory.push(numberBeforeCalculation + '=' + this.result);
    // }

    // back(btn) {
    //     this.vibration.vibrate(30);
    //     var value = this.result.length;
    //     if(value = this.result.length){
    //         this.result = this.result.substr(0, value - 1);
    //     }
    //     else{
    //         this.result='';
    //     }
        
    // }

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
