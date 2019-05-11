import {Component, OnInit} from '@angular/core';
import {Web3Service} from './util/web3.service';


declare let require: any;
const user_artifacts = require('../../build/contracts/User.json');
const property_artifacts = require('../../build/contracts/Property.json');
const transaction_artifacts = require('../../build/contracts/Transactions.json');

const cicada_3301_artifacts = require('../../build/contracts/Cicada_3301.json');


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';


  account: string;
  User: any;
  Property: any;
  Transaction: any;

  UserDeployed: any;
  PropertyDeployed: any;
  TransactionDeployed: any;

  prop_id;
  _from;
  _to;
  _addr;
  _name;
  _adr;
  _trans_id;
  _prev;

  Cicada_3301: any;
  Cicada_3301Deployed: any;

  constructor(private web3Service: Web3Service) {
  }

  ngOnInit(): void {
    console.log('OnInit: ' + this.web3Service);
    console.log(this);
    this.watchAccount();
    this.initUserContract();
    this.initPropertyContract();
    this.initTransactionContract();
    this.initCicada_3301Contract();

    setTimeout(() => {
      console.log('testing');
      // this.cicada_addUser();
      // this.cicada_create_new_property();
    }, 5000);
  }


  watchAccount() {
    this.web3Service.accountsObservable.subscribe((accounts) => {
      this.account = accounts[0];
    });
  }


  initUserContract() {
    // UserArtifacts
    this.web3Service.artifactsToContract(user_artifacts).then((UserAbstraction) => {
      this.User = UserAbstraction;
      this.User.deployed().then(deployed => {
        console.log(deployed);
        this.UserDeployed = deployed;

        const listen = this.UserDeployed.newUserCreated((data) => {
          console.log(data);
        });


      });
    }).then(() => {
      console.log('User init');
    });
  }

  initPropertyContract() {
    // PropertyArtifacts
    this.web3Service.artifactsToContract(property_artifacts).then((PropertyAbstraction) => {
      this.Property = PropertyAbstraction;
      this.Property.deployed().then(deployedProperty => {
        console.log('Property', deployedProperty);
        this.PropertyDeployed = deployedProperty;
        console.log('deployedProperty', deployedProperty);
      });
    }).then(() => {
      console.log('Property init');
    });
  }


  initTransactionContract() {
    // PropertyArtifacts
    this.web3Service.artifactsToContract(transaction_artifacts).then((TransactionAbstraction) => {
      this.Transaction = TransactionAbstraction;
      this.Transaction.deployed().then(deployedTransaction => {
        console.log('Property', deployedTransaction);
        this.TransactionDeployed = deployedTransaction;
        console.log('deployedTransaction', deployedTransaction);
      });
    }).then(() => {
      console.log('deployedTransaction init');

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

  async getUser() {
    const info = await this.UserDeployed.getUser.call(this.account);
    console.log(info[0], `${info[1]}, ${info[2]}`);
  }


  addUser() {
    this.UserDeployed.addUser.sendTransaction(this._name, this._adr, this._to, {from: this._from});
  }

  async getProperty() {
    const info = await this.PropertyDeployed.getPropertyDetails.call(this.prop_id);
    console.log(`${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}`);
  }


  async addProperty() {
    const p_id = this.PropertyDeployed.createNewProperty.sendTransaction(this._to, this._addr, {from: this._from});
    console.log(p_id);
  }


  async addTransaction() {
    const info = await this.PropertyDeployed.addTransaction.sendTransaction(this.prop_id, this._from, this._to, this._prev, {from: this._from});
    console.log(`${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}`);
  }

  async getTransaction() {
    const info = await this.TransactionDeployed.getTransactionTrail.call(this._trans_id);
    console.log(`${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}, ${info[4]}`);
  }

  async cicada_addUser() {
    console.log('me', 797967, this.account, this.account);
    // this.Cicada_3301Deployed.addUser.sendTransaction(this._name, this._adr, this._to, {from: this._from});
    await this.Cicada_3301Deployed.addUser.sendTransaction("fwvegrfwuey", 48484, this.account, {from: this.account});
    await this.Cicada_3301Deployed.getUser.call(this.account).then(info => {
      console.log('from app.component.ts one', `${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}`);
    });
  }

  async cicada_create_new_property() {
    // await this.Cicada_3301Deployed.createNewProperty.sendTransaction(this.account, 'Ghar', '#nbdhsbhjd', {from: this.account});
    await this.Cicada_3301Deployed.viewPropertyDetail.call(1).then(info => {
      console.log('from app.component.ts two', `${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}`);
    });
  }
}
