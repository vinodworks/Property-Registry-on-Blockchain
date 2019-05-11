import {Component, OnInit} from '@angular/core';
import {Web3Service} from '../../util/web3.service';


declare let require: any;
const cicada_3301_artifacts = require('../../../../build/contracts/Cicada_3301.json');

const uTypes = ['user', 'admin', 'super_admin'];

@Component({
  selector: 'app-final-home',
  templateUrl: './final-home.component.html',
  styleUrls: ['./final-home.component.css']
})
export class FinalHomeComponent implements OnInit {

  leftSideNev = true;
  rightSideNev = true;
  rightSideNev2 = false;
  rightSideNev3 = false;

  currentPage = 'main';

  accounts: string[] = [undefined];
  Cicada_3301: any;
  Cicada_3301Deployed: any;

  currentPropertyId: any;

  setCurrentPropertyId(id) {
    this.currentPage = 'land-dept';
    this.currentPropertyId = id;
    console.log(id);
  }


  constructor(private web3Service: Web3Service) {
  }

  ngOnInit() {
    this.watchAccount();
    this.initCicada_3301Contract();
  }


  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.accounts = accounts;
      this.getUserInfo();
    });
  }

  initCicada_3301Contract() {
    this.web3Service.artifactsToContract(cicada_3301_artifacts).then(Cicada_3301Abstraction => {
      this.Cicada_3301 = Cicada_3301Abstraction;
      this.Cicada_3301.deployed().then(cicadaTransaction => {
        console.log('Property', cicadaTransaction);
        this.Cicada_3301Deployed = cicadaTransaction;
        console.log('cicadaTransaction', cicadaTransaction);
      });
    });
  }

  toggleRightSideNev() {
    this.rightSideNev2 = !this.rightSideNev2;
    this.rightSideNev = !this.rightSideNev;
  }


  form0 = {eth_id: undefined, aadhar: undefined, ipfs_hash: undefined};

  sendRequest() {
    this._sendRequest(this.form0.eth_id, this.currentPropertyId, this.form0.ipfs_hash);
  }

  _sendRequest(_buyer_id, _prop_id, ipfs_hash) {
    this.Cicada_3301Deployed.addPropertyRequest.sendTransaction(_buyer_id, _prop_id, ipfs_hash, {from: this.accounts[0]});
  }


  userInfo = {name: undefined, adr: undefined, utype: undefined};
  UserTypes = uTypes;
  async getUserInfo() {
    const info = await this.Cicada_3301Deployed.getUser.call(this.accounts[0]);
    this.userInfo.name = `${info[0]}`;
    this.userInfo.adr = `${info[1]}`;
    this.userInfo.utype = `${info[2]}`;
    console.log(info);

    this.getNotifications();
  }

  notifications = [];
  async getNotifications(){
    const p_id = await this.Cicada_3301Deployed.getNextPropertyId.call(this.accounts[0], 0);
    this.notifications.push(`${p_id}`);
    console.log('Notification', `${p_id}`);
  }

}
