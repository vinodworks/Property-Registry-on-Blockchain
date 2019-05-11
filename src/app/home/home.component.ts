import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

import {Web3Service} from '../util/web3.service';


declare let require: any;
const user_artifacts = require('../../../build/contracts/User.json');

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  account: string;
  User: any;
  UserDeployed: any;

  constructor(private web3Service: Web3Service) {
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.web3Service.artifactsToContract(user_artifacts).then((UserAbstraction) => {
        this.User = UserAbstraction;
        this.User.deployed().then(deployed => {
          console.log(deployed);
          this.UserDeployed = deployed;
        });

      });
  }


  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.account = accounts[0];
      this.refreshBalance();
    });
  }

  async refreshBalance() {
    console.log('Refreshing balance');
  }

  async  go() {
    const info = await this.UserDeployed.getUser.call(this.account);
    console.log(info[0], `${info[1]}, ${info[2]}`);
  }


  addUser() {
    this.UserDeployed.addUser.sendTransaction('Shriji', 123456789, this.account, {from: this.account});
  }


}


// <a routerLink="/property">Property</a>
//
// <iframe
// width="420"
// frameborder="0"
// scrolling="no"
// marginheight="0"
// marginwidth="0"
// height="345"
// [src]="mapUrl | safe"
// ></iframe>





