import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Web3Service} from '../util/web3.service';

@Component({
  selector: 'app-final-admin',
  templateUrl: './final-admin.component.html',
  styleUrls: ['./final-admin.component.css']
})
export class FinalAdminComponent implements OnInit {

  @Input()accounts: string[];
  @Input()Cicada_3301: any;
  @Input()Cicada_3301Deployed: any;
  @Input()UserName: string;

  constructor(private web3Service: Web3Service) { }
  @Output() rightSideNev2 = new EventEmitter<boolean>();

  forms: boolean[] = [false, false, false];

  form0 = {eth_id: undefined, prop: undefined, hash: undefined, coordinates: undefined};

  ngOnInit() {
  }


  toggleMe(_form_id) {
    const temp = this.forms[_form_id];
    this.forms = [false, false, false];
    this.forms[_form_id] = ! temp;
  }

  async createNewProperty() {
    console.log('send Transaction', this.form0.eth_id, this.form0.prop, this.form0.hash);

    const info = {_info: this.form0.prop, type: 'land', coordinates: this.form0.coordinates};
    // const info = {_info: this.form0.prop, type: 'car'};

    console.log(JSON.stringify(info));
    await this.Cicada_3301Deployed.createNewProperty.sendTransaction(this.form0.eth_id, JSON.stringify(info), this.form0.hash, {from: this.accounts[0]});
  }

}
