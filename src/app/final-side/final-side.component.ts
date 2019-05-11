import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Web3Service} from '../util/web3.service';

export interface Section {
  property_id: string;
  updated: Date;
  address: string;
}

declare let require: any;
const cicada_artifacts = require('../../../build/contracts/Cicada_3301.json');

@Component({
  selector: 'app-final-side',
  templateUrl: './final-side.component.html',
  styleUrls: ['./final-side.component.css']
})
export class FinalSideComponent implements OnInit {

  @Output() openLandDept = new EventEmitter<number>();

  folders: Section[] = [
    {
      property_id: '0x132132132132132',
      updated: new Date('1/1/16'),
      address: ''
    },
    {
      property_id: '0x468513546123585',
      updated: new Date('1/1/16'),
      address: ''
    },
    {
      property_id: '0x468554654564561',
      updated: new Date('1/3/16'),
      address: ''
    }
  ];

  // notes: Section[] = [
  //   {
  //     name: 'Vacation Itinerary',
  //     updated: new Date('2/20/16'),
  //   },
  //   {
  //     name: 'Kitchen Remodel',
  //     updated: new Date('1/18/16'),
  //   }
  // ];

  @Input() accounts: string[];
  @Input() Cicada_3301: any;
  @Input() Cicada_3301Deployed: any;

  @Input() notifications: string[];

  searchResult = {address: undefined, trans_id: undefined, coordinates: undefined};

  getPropertyId = '';

  constructor(private web3Service: Web3Service) {
  }

  ngOnInit() {
  }

  showProperty() {
    console.log('getDetail', this.getPropertyId);
    console.log(this.getPropertyDetail(this.getPropertyId));
  }


  async getPropertyDetail(prop_id) {
    return this.Cicada_3301Deployed.viewPropertyDetail.call(prop_id).then(info => {
      const infoAboutProperty = JSON.parse(info[0]);
      this.searchResult.address = infoAboutProperty._info;
      this.searchResult.coordinates = infoAboutProperty.coordinates;
      this.searchResult.trans_id = `${info[1]}`;
      console.log('from final-side.component.ts one', `${info[0]}, ${info[1]}, ${info[2]}, ${info[3]}`);
    });
  }

}
