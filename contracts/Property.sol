pragma solidity ^0.5.0;

import './User.sol';
import "./Transactions.sol";


contract Property is User, Transactions {

  // Property details
  struct PropertyDetail {
    address _owner;
    string _address;
    uint _time;
    uint trans_id;
  }

  // mapping all properties
  mapping(uint => PropertyDetail) properties;
  uint private p_id;

  constructor() public {
    p_id = 1;
  }


  // create new property
  function createNewProperty(address _to, string memory _ads) public returns (uint) {

//    final_tr[transactionRequestID] = Transaction(p_id, msg.sender, _to, 0, TransactionStates.request);

    properties[p_id] = PropertyDetail(_to, _ads, block.timestamp, addTransaction(p_id, msg.sender, _to, 0));


    return (p_id++);
  }

  // get property details
  function getPropertyDetails(uint _prop_id) view public returns (address, string memory, uint, uint){
    return (properties[_prop_id]._owner, properties[_prop_id]._address, properties[_prop_id].trans_id, properties[_prop_id]._time);
  }


  //cancel transactions
  function approveTransaction(uint transactioRequestID) public isSuperAdmin returns (bool){
    final_tr[transactionRequestID].state = TransactionStates.reject;
    properties[final_tr[transactionRequestID].property_id].trans_id = final_tr[transactionRequestID].prev;

    // remove from the stack
    delete final_tr[transactionRequestID];
  }

  // addTransaction create new transaction on top of the previous block
  function addTransaction(uint property_id, address _sender, address _receiver, uint _prev) public returns (uint){
    final_tr[transactionRequestID] = Transaction(property_id, _sender, _receiver, _prev, TransactionStates.request);
    properties[property_id].trans_id = transactionRequestID;
    return (transactionRequestID++);
  }


}
