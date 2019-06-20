pragma solidity ^0.4.24;


contract newcicada {
    

    struct Obj {
        uint _prev;
        uint _next;
    }

    // define User
    enum UserType {user, admin, super_admin}
    struct Person {
        string name;        // Name
        uint adr;           // Aadhar number
        UserType utype;     // User type

        // Properties Associated with a user
        mapping(uint => Obj) properties;
        uint propertiesTop;

        // Property buyRequest
        mapping(uint => Obj) requestList;
        uint requestListTop;

        // Property buyRequest
        mapping(uint => Obj) approvalRequest;
        uint approvalRequestTop;
    }


    bool super_admin_created = false; // Create the first User as SuperAdmin
    mapping(address => Person) users;
    mapping(uint => address) aadhaarmap;
    address[] admins;


    // Property
    // defination
    struct PropertyDetail {
        string _info;           // information about the property
        uint _trans_id;         // Transaction id
    }

    // defination
    // mapping all properties
    mapping(uint => PropertyDetail) properties;
    uint private property_counter = 1;

    // Tranction
    enum TransectionState {requested, approved, rejected}

    // Tranction block
    struct Transection {
        address _from;          // sender
        address _to;            // buyer
        uint256 _prev;          // previous Tranction block id
        uint256 _prop;          // property id { any property }

        address approved_by1;
        address approved_by2;

        TransectionState _state1;  // state of Transection by first random admin
        TransectionState _state2;  // state of Transection by second random admin


        string _ipfs_hash;
        uint256 _time;            // timestamp of Transection creation
    }

    // mapping all the Tranction records
    mapping(uint256 => Transection) recordlist;
    // mapping(uint256 => Obj) requestList;
    // uint256 requestListTop = 0;
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
            users[_userId].approvalRequestTop = 0;

            aadhaarmap[_adr] = _userId;

            // make the first user super admin
            if(super_admin_created == false) {
                 users[_userId].utype = UserType.super_admin;
                 admins.push(msg.sender);
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


    // add new Tranction requested {Tranction requested! not a final Tranction}
    function addRecord(address _from_address, address _to_address, uint256 _prop_id, string memory ipfs_hash) public returns(uint256) {
        recordlist[requestListCounter]._from = _from_address;
        recordlist[requestListCounter]._to = _to_address;
        recordlist[requestListCounter]._prop = _prop_id;


        recordlist[requestListCounter]._state1 = TransectionState.requested;
        recordlist[requestListCounter]._state2 = TransectionState.requested;

        recordlist[requestListCounter]._ipfs_hash = ipfs_hash;
        recordlist[requestListCounter]._time = block.timestamp;

        // link the new block to the previous block
        recordlist[requestListCounter]._prev = properties[_prop_id]._trans_id;

        // point the new request
        properties[_prop_id]._trans_id = requestListCounter;


        // select two random admins and send notification to them
        random(admins.length, _prop_id);

        // notify(requestListCounter);

        return (requestListCounter++);
    }

    function random(uint adminCount, uint _prop_id) private {
        uint one = block.timestamp % adminCount;
        uint two = (one + block.timestamp) % adminCount;
        if(one == two) two = (one + 1) % adminCount;

        recordlist[requestListCounter].approved_by1 = admins[one];
        recordlist[requestListCounter].approved_by2 = admins[two];

        notify(admins[one], _prop_id);
        notify(admins[two], _prop_id);

   }

   // add new property on list {}
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
    function notify(address admin_id, uint _req_id) public {

        // add the pointer of the transection request to the requestList
        users[admin_id].approvalRequest[users[admin_id].approvalRequestTop]._next = _req_id;

        // link the top requestList block to the previous block
        users[admin_id].approvalRequest[_req_id]._prev = users[admin_id].requestListTop;

        // make the top pointer as the end of the list
        users[admin_id].approvalRequest[_req_id]._next = 0;

        // save the pointer to the top of the requestList
        users[admin_id].approvalRequestTop = _req_id;
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


    // function viewTranction(uint _trans_id)view public returns(address,address, uint256, uint256, address, address, TransectionState , TransectionState , string memory ) {
    //     return (recordlist[_trans_id]._from, recordlist[_trans_id]._to, recordlist[_trans_id]._prev, recordlist[_trans_id]._prop, recordlist[_trans_id].approved_by1, recordlist[_trans_id].approved_by2, recordlist[_trans_id]._state1, recordlist[_trans_id]._state2, recordlist[_trans_id]._ipfs_hash);
    // }

    function getTransectionSender(uint256 _trans_id) view public returns(address){
        return recordlist[_trans_id]._from;
    }

    function getTransectionTime(uint256 _trans_id) view public returns(uint256){
        return recordlist[_trans_id]._time;
    }

    function getTransectionTo(uint256 _trans_id) view public returns(address){
        return recordlist[_trans_id]._to;
    }

    function getTransectionPrev(uint256 _trans_id) view public returns(uint256){
        return recordlist[_trans_id]._prev;
    }

    function getTransectionProp(uint256 _trans_id) view public returns(uint256){
        return recordlist[_trans_id]._prop;
    }

    function getTransectionApproveInfo(uint256 _trans_id) view public returns(address, address, TransectionState, TransectionState){
        return (recordlist[_trans_id].approved_by1, recordlist[_trans_id].approved_by2, recordlist[_trans_id]._state1, recordlist[_trans_id]._state2);
    }

    function getTransectionHashAndTime(uint256 _trans_id) view public returns(string memory, uint256){
        return (recordlist[_trans_id]._ipfs_hash, recordlist[_trans_id]._time);
    }

    // approve the Tranction request
    function approve(uint256 _record_id) public isAdmin {
        if(msg.sender == recordlist[_record_id].approved_by1){
            recordlist[_record_id]._state1 = TransectionState.approved;
        }

         if(msg.sender == recordlist[_record_id].approved_by2){
            recordlist[_record_id]._state2 = TransectionState.approved;
        }


        // remove notification from user
        removePropertyRequest(recordlist[_record_id]._to, _record_id);

        // remove notification from admin
        removeNotification(msg.sender, _record_id);

        addProperty(recordlist[_record_id]._to, _record_id);
        removeProperty(recordlist[_record_id]._to, _record_id);

    }

    // reject the Tranction request
    function reject(uint256 _record_id) public isAdmin {
        removeProperty(recordlist[_record_id]._to, _record_id);

        // remove notification from user
        removePropertyRequest(recordlist[_record_id]._to, _record_id);

        // remove notification from admin
        removeNotification(msg.sender, _record_id);
    }
    ///////////////////////////////////////////////////////////

     function removeNotification(address admin_id, uint _req_id) public {
        // sift the pointer to the previous block if - removing the top block
        if(users[admin_id].approvalRequestTop == _req_id) users[admin_id].approvalRequestTop = users[admin_id].approvalRequest[_req_id]._prev;


        // link the top block with the previous block
        users[admin_id].approvalRequest[users[admin_id].approvalRequest[_req_id]._next]._prev = users[admin_id].approvalRequest[_req_id]._prev;
        users[admin_id].approvalRequest[users[admin_id].approvalRequest[_req_id]._prev]._next = users[admin_id].approvalRequest[_req_id]._next;


        // clear the current block
        users[admin_id].approvalRequest[_req_id]._prev = 0;
        users[admin_id].approvalRequest[_req_id]._next = 0;
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
        return users[msg.sender].approvalRequest[_ptr]._next;
    }

    // create new property
    function createNewProperty(address _to, string memory _info, string memory _data_hash) public returns (uint) {
        properties[property_counter] = PropertyDetail(_info, requestListCounter);

        recordlist[requestListCounter]._to = _to;
        recordlist[requestListCounter]._prop = property_counter;

        random(admins.length, property_counter);

        recordlist[requestListCounter]._ipfs_hash = _data_hash;
        recordlist[requestListCounter]._time = block.timestamp;


        addProperty(_to, requestListCounter);

        requestListCounter++;

        //return property_id
        return (property_counter++);
  }

}
