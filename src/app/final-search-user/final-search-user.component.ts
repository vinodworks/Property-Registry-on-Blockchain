import {Component, Input, OnInit} from '@angular/core';
import {Web3Service} from '../util/web3.service';

@Component({
  selector: 'app-final-search-user',
  templateUrl: './final-search-user.component.html',
  styleUrls: ['./final-search-user.component.css']
})
export class FinalSearchUserComponent implements OnInit {
  @Input() accounts: string[];
  @Input() Cicada_3301: any;
  @Input() Cicada_3301Deployed: any;

  aadhaar_id = undefined;

  UserTypes = ['user', 'admin', 'super_admin'];

  userEthAccount: string = undefined;
  userName: string = undefined;
  userType = undefined;

  constructor(private web3Service: Web3Service) { }

  ngOnInit() {
  }

  async searchById() {
    console.log('searchById', this.aadhaar_id);

    const a = await this.Cicada_3301Deployed.searchByAadhaar.call(this.aadhaar_id, {from: this.accounts[0]});

    const info = await this.Cicada_3301Deployed.getUser.call(a);
    this.userEthAccount = a;
    this.userName = info[0];
    this.userType = this.UserTypes[`${info[2]}`];

    console.log('searchById', a, info);
  }

}
