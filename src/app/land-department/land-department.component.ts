import {Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Web3Service} from '../util/web3.service';


class Transection {
  _from: string;
  _to: string;
  _ipfs_hash: string;
  _state: number;
  _prev: string;
  _aadhaar: string;
}

@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {
  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}


@Component({
  selector: 'app-land-department',
  templateUrl: './land-department.component.html',
  styleUrls: ['./land-department.component.css']
})
export class LandDepartmentComponent implements OnInit {

  tiles: Tile[] = [
    {text: 'One', cols: 3, rows: 1, color: 'lightblue'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Two', cols: 1, rows: 2, color: 'lightgreen'},
    {text: 'Four', cols: 4, rows: 1, color: '#DDBDF1'},
  ];

  mapUrl: string;
  position = {lat: 26.2314, lng: 78.2053};
  @Input() currentPropertyId;
  @Input() accounts: string[];

  address: string;

  changeUrl(lat, lng) {
    this.mapUrl = 'https://maps.google.com/maps?q=' + lat + ',' + lng + '&t=&z=13&ie=UTF8&iwloc=&output=embed';
  }


  isLinear = false;
  firstFormGroup: any;
  secondFormGroup: any;


  // QR
  elementType: 'url' | 'canvas' | 'img' = 'url';
  value: string = 'Techiediaries';


  @Input() Cicada_3301: any;
  @Input() Cicada_3301Deployed: any;

  constructor(private _formBuilder: FormBuilder, private web3Service: Web3Service) {
  }

  @Output() openRightSideNev2 = new EventEmitter<boolean>();

  @Input()
  set _currentPropertyId(val) {
    this.currentPropertyId = this.paddy(val, 7, '0');
    this.getPropertyInfo(this.currentPropertyId);
  }

  ngOnInit() {
    this.currentPropertyId = this.paddy(this.currentPropertyId, 7, '0');

    // this.changeUrl(this.position.lat, this.position.lng);
    this.getPropertyInfo(this.currentPropertyId);

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  paddy(num, padlen, padchar) {
    const pad_char = typeof padchar !== 'undefined' ? padchar : '0';
    const pad = new Array(1 + padlen).join(pad_char);
    return (pad + num).slice(-pad.length);
  }

  async getPropertyInfo(prop_id) {
    return this.Cicada_3301Deployed.viewPropertyDetail.call(prop_id).then(info => {
      const infoAboutProperty = JSON.parse(info[0]);
      const pos = infoAboutProperty.coordinates.split(',');
      this.position.lat = pos[0];
      this.position.lng = pos[1];
      this.address = infoAboutProperty._info;
      this.changeUrl(this.position.lat, this.position.lng);
      console.log(infoAboutProperty, this.position);

      console.log('transaction id', `${info[1]}`);

      this.getTransectionHistory(`${info[1]}`);
    });
  }


  transHistory: Transection[] = [];

  async getTransectionHistory(current_trasection_id) {
    console.log('getTransectionHistory', current_trasection_id);
    this.Cicada_3301Deployed.viewTranction.call(current_trasection_id).then(info => {
      console.log(info);

      this.resolveUser(`${info[1]}`).then(user => {
        console.log('resolved User', user);
        if (user[0] !== '') {
          console.log('land dept  ')
          this.transHistory.push(
            {
              _from: `${info[0]}`,
              _to: `${user[0]}`,
              _ipfs_hash: `${info[6]}`,
              _state: 1,
              _prev: `${info[2]}`,
              _aadhaar: `${user[1]}`
            }
          );
          if (`${user[2]}` !== '0') {
            this.getTransectionHistory(info[2]);
          }
        }


      });


    });
  }

  async resolveUser(eth_id) {
    return new Promise((resolve, reject) => {
      this.Cicada_3301Deployed.getUser.call(eth_id).then(info => {
        console.log('resolveUser', info);
        resolve(info);
      });
    });


  }

}
