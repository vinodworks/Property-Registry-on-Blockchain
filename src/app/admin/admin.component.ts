import {Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor() {
  }

  @Output() signal = new EventEmitter<string>();

  forms = [false, false, false];
  account: any;
  userInfo: any;

  form1 = {
    userType: undefined,
    EthAccount: undefined
  };

  toggle(index) {
    for (let i = 0; i < this.forms.length; i++) {
      if (i !== index) {
        this.forms[i] = false;
      }
    }
    this.forms[index] = !this.forms[index];
  }

  ngOnInit() {
    // this.ethcontractService.getAccount().then(account => {
    //   this.account = account;
    // });

  }

  changeUserDomain() {
    // console.log(this.form1);
    // this.ethcontractService.changeUserDomain(this.form1.EthAccount, this.form1.userType, this.account);
  }


}
