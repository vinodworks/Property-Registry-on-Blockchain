pragma solidity ^0.5.0;

import './User.sol';
import "./Property.sol";

contract Transactions is User {
  //enumeration
  enum TransactionStates{request, approved, reject}
  // transaction
  struct Transaction {
    uint property_id;
    address sender;
    address receiver;
    uint prev;
    TransactionStates state;
  }

  uint transactionRequestID;
  constructor() public {
    transactionRequestID = 1;
  }

  // mapping all
  mapping(uint => Transaction) final_tr;


  //approve transactions
  function approveTransaction(uint _transactioRequestID) public isSuperAdmin returns (bool){
    final_tr[_transactioRequestID].state = TransactionStates.approved;
  }


  function getTransactionTrail(uint _transactioRequestID) view public returns (uint, address, address, uint, TransactionStates){
    return (final_tr[_transactioRequestID].property_id, final_tr[_transactioRequestID].sender, final_tr[_transactioRequestID].receiver, final_tr[_transactioRequestID].prev, final_tr[_transactioRequestID].state);
  }
}
