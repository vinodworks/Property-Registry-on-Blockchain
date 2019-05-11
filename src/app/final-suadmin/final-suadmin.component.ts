import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {Web3Service} from '../util/web3.service';


@Component({
  selector: 'app-final-suadmin',
  templateUrl: './final-suadmin.component.html',
  styleUrls: ['./final-suadmin.component.css']
})
export class FinalSuadminComponent implements OnInit {

  // accounts: string[] = [undefined];
  constructor(private web3Service: Web3Service) { }
  @Output() rightSideNev2 = new EventEmitter<boolean>();

  forms: boolean[] = [true, false, false];

  userId = undefined;

  @Input() accounts: string[];
  @Input() Cicada_3301: any;
  @Input() Cicada_3301Deployed: any;

  ngOnInit() {
  }

  async changeUserDomain(domain) {
    await this.Cicada_3301Deployed.changeUserDomain.sendTransaction( this.userId, domain, {from: this.accounts[0]});
  }

  toggleMe(_form_id) {
    const temp = this.forms[_form_id];
    this.forms = [false, false, false];
    this.forms[_form_id] = ! temp;
  }

}
