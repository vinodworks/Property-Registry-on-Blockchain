import {Component, Input, OnInit} from '@angular/core';
import {Web3Service} from '../util/web3.service';

@Component({
  selector: 'app-final-create-user',
  templateUrl: './final-create-user.component.html',
  styleUrls: ['./final-create-user.component.css']
})
export class FinalCreateUserComponent implements OnInit {

  @Input() accounts: string[];
  @Input() Cicada_3301: any;
  @Input() Cicada_3301Deployed: any;

  name: string;
  eth_id: string;
  aadhaar: string;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
  }

  createUser() {
    console.log(this.name);
    console.log(this.eth_id);
    console.log(this.aadhaar);


    this.Cicada_3301Deployed.addUser.sendTransaction(this.name, this.aadhaar, this.eth_id, {from: this.accounts[0]});


  }


}
