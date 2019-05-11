pragma solidity ^0.5.0;


contract Cicada_3301 {

    struct Obj {
        uint _prev;
        uint _next;
    }

    // User
    // defination
    enum UserType {user, admin, super_admin}
    struct Person {
        string name;        // Name
        uint adr;           // Aadhaar number
        UserType utype;     // User type

        // Properties Associated with a user
        mapping(uint => Obj) properties;
        uint propertiesTop;

        // Property buyRequest
        mapping(uint => Obj) requestList;
        uint requestListTop;
    }

    // User decleration
    bool super_admin_created = false; // Create the first User as SuperAdmin
    mapping(address => Person) users;
    mapping(uint => address) aadhaarmap;



    // Property
    // defination
    struct PropertyDetail {
        string _info;           // information about the property
        // string _data_hash;      // ipfs hash of associated data
        uint _trans_id;         // Transaction id
    }

    // defination
    // mapping all properties
    mapping(uint => PropertyDetail) properties;
    uint private property_counter = 1;


    // Tranction
    enum TranctionState {requested, approved, rejected}

    // Tranction block
    struct Tranction {
        address _from;          // sender
        address _to;            // buyer
        uint256 _prev;          // previous Tranction block id
        uint256 _prop;          // property id { any property }
        TranctionState _state;  // state of Tranction
        address approved_by;
        string _ipfs_hash;
    }

    // mapping all the Tranction records
    mapping(uint256 => Tranction) recordlist;
    mapping(uint256 => Obj) requestList;
    uint256 requestListTop = 0;
    uint256 requestListCounter = 1;



    // drver functions
    // Admin require
    modifier isAdmin() {
        if(users[msg.sender].utype == UserType.admin || users[msg.sender].utype == UserType.super_admin)
        _;
    }
    // Super Admin require
    modifier isSuperAdmin() {
        if(users[msg.sender].utype == UserType.super_admin)
        _;
    }



    //User Logic
    // adding the user with services
    function addUser(string memory _name, uint _adr, address _userId) public {

        // check if the user is previously registerd
        if(_adr != uint(0) && aadhaarmap[_adr] == address(0)) {

            users[_userId].name = _name;
            users[_userId].adr = _adr;
            users[_userId].utype = UserType.user;

            // set initial pointers
            users[_userId].requestListTop = 0;
            users[_userId].propertiesTop = 0;
            aadhaarmap[_adr] = _userId;

            // make the first user super admin
            if(super_admin_created == false) {
                 users[_userId].utype = UserType.super_admin;
                 super_admin_created = true;
            }
        }
    }


    function changeUserDomain(address _userId, UserType _utype) public isSuperAdmin {
        require(_utype != UserType.super_admin);
        users[_userId].utype = _utype;
    }

    // add property in requestList {if the user is requested to sell there property}
    function addPropertyRequest(address _buyer_id, uint _prop_id, string memory ipfs_hash) public {
        uint _req_id = addRecord(msg.sender, _buyer_id, _prop_id, ipfs_hash);

        // add the pointer of the transection request to the requestList
        users[_buyer_id].requestList[users[_buyer_id].requestListTop]._next = _req_id;

        // link the top requestList block to the previous block
        users[_buyer_id].requestList[_req_id]._prev = users[_buyer_id].requestListTop;

        // make the top pointer as the end of the list
        users[_buyer_id].requestList[_req_id]._next = 0;

        // save the pointer to the top of the requestList
        users[_buyer_id].requestListTop = _req_id;
    }


    // remove the property request from  the requestList
    function removePropertyRequest(address _userId, uint _req_id) public {
        // shift the pointer to the previous block if - removing the top block
        if(users[_userId].requestListTop == _req_id) users[_userId].requestListTop = users[_userId].requestList[_req_id]._prev;

        // link the previous and next block
        users[_userId].requestList[users[_userId].requestList[_req_id]._prev]._next = users[_userId].requestList[_req_id]._next;
        users[_userId].requestList[users[_userId].requestList[_req_id]._next]._prev = users[_userId].requestList[_req_id]._prev;

        // clear the current block
        users[_userId].requestList[_req_id]._next = 0;
        users[_userId].requestList[_req_id]._prev = 0;
    }



    // add new Tranction requested {Tranction requested! not a final Tranction}
    function addRecord(address _from_address, address _to_address, uint256 _prop_id, string memory ipfs_hash) public returns(uint256) {
        recordlist[requestListCounter]._from = _from_address;
        recordlist[requestListCounter]._to = _to_address;
        recordlist[requestListCounter]._prop = _prop_id;
        recordlist[requestListCounter]._state = TranctionState.requested;
        recordlist[requestListCounter]._ipfs_hash = ipfs_hash;

        // link the new block to the previous block
        recordlist[requestListCounter]._prev = properties[_prop_id]._trans_id;

        // point the new request
        properties[_prop_id]._trans_id = requestListCounter;

        notify(requestListCounter);

        return (requestListCounter++);
    }


    // add new property on list
    function addProperty(address _userId, uint _req_id) public {
        // add new property on top of the list
        users[_userId].properties[users[_userId].propertiesTop]._next = _req_id;

        // link the top block with the previous block
        users[_userId].properties[_req_id]._prev = users[_userId].propertiesTop;

        // mark the top as the end block
        users[_userId].properties[_req_id]._next = 0;

        // set the pointer to the top block / latest block
        users[_userId].propertiesTop = _req_id;
    }

    function removeProperty(address _userId, uint _req_id) public {
        // sift the pointer to the previous block if - removing the top block
        if(users[_userId].propertiesTop == _req_id) users[_userId].propertiesTop = users[_userId].properties[_req_id]._prev;

        // link the top block with the previous block
        users[_userId].properties[users[_userId].properties[_req_id]._prev]._next = users[_userId].properties[_req_id]._next;
        users[_userId].properties[users[_userId].properties[_req_id]._next]._prev = users[_userId].properties[_req_id]._prev;

        // clear the current block
        users[_userId].properties[_req_id]._next = 0;
        users[_userId].properties[_req_id]._prev = 0;
    }




    // notify admin
    function notify(uint _req_id) public {

        // add the pointer of the transection request to the requestList
        requestList[requestListTop]._next = _req_id;

        // link the top requestList block to the previous block
        requestList[_req_id]._prev = requestListTop;

        // make the top pointer as the end of the list
        requestList[_req_id]._next = 0;

        // save the pointer to the top of the requestList
        requestListTop = _req_id;
    }



    // Views
    // get User information
    function getUser(address _userId) view public returns(string memory, uint, UserType) {
        // return username, aadhaar-number, user-domain
        return (users[_userId].name, users[_userId].adr, users[_userId].utype);
    }

    function viewPropertyDetail(uint _prop_id)view public returns(string memory, uint) {
        return (properties[_prop_id]._info, properties[_prop_id]._trans_id);
    }

    function viewTranction(uint _trans_id)view public returns(address, address, uint, uint, TranctionState, address, string memory) {
        return (recordlist[_trans_id]._from, recordlist[_trans_id]._to, recordlist[_trans_id]._prev, recordlist[_trans_id]._prop, recordlist[_trans_id]._state,  recordlist[_trans_id].approved_by, recordlist[_trans_id]._ipfs_hash);
    }




    ////////////////////////////////////////////////////////////
    // approve the Tranction request
    function approve(uint256 _record_id) public isAdmin {
        recordlist[_record_id]._state = TranctionState.approved;
        recordlist[_record_id].approved_by = msg.sender;

        // remove notification from user
        removePropertyRequest(recordlist[_record_id]._to, _record_id);

        // remove notification from admin
        removeNotification(_record_id);

        addProperty(recordlist[_record_id]._to, _record_id);
        removeProperty(recordlist[_record_id]._to, _record_id);

    }

    // reject the Tranction request
    function reject(uint256 _record_id) public isAdmin {
        removeProperty(recordlist[_record_id]._to, _record_id);

        // remove notification from user
        removePropertyRequest(recordlist[_record_id]._to, _record_id);

        // remove notification from admin
        removeNotification(_record_id);
    }
    ///////////////////////////////////////////////////////////

    function removeNotification(uint _req_id) public {
        // sift the pointer to the previous block if - removing the top block
        if(requestListTop == _req_id) requestListTop = requestList[_req_id]._prev;

        // link the top block with the previous block
        requestList[requestList[_req_id]._next]._prev = requestList[_req_id]._prev;
        requestList[requestList[_req_id]._prev]._next = requestList[_req_id]._next;

        // clear the current block
        requestList[_req_id]._next = 0;
        requestList[_req_id]._prev = 0;
    }


    // send one property id at a time { default is 0 }
    function getNextPropertyId(address _userId, uint _ptr) view public returns(uint) {
        return users[_userId].properties[_ptr]._next;
    }

    // send one property id at a time { default is 0 }
    function getNextRequestedPropertyId(address _userId, uint _ptr) view public returns(uint) {
        return users[_userId].requestList[_ptr]._next;
    }

    // send one notification id at a time { default is 0 }
    function getNextNotificationId(uint _ptr) view public returns(uint) {
        return requestList[_ptr]._next;
    }


    // create new property
    function createNewProperty(address _to, string memory _info, string memory _data_hash) public returns (uint) {
        properties[property_counter] = PropertyDetail(_info, requestListCounter);

        recordlist[requestListCounter] = Tranction(address(0), _to, uint(0), property_counter, TranctionState.approved, msg.sender, _data_hash);

        addProperty(_to, requestListCounter);

        requestListCounter++;

        //return property_id
        return (property_counter++);
  }

  function searchByAadhaar(uint _aadhaar) view public returns(address) {
    return (aadhaarmap[_aadhaar]);
  }

}
