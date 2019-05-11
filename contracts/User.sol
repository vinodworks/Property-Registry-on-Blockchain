pragma solidity ^0.5.0;

contract User {

    enum UserType {user, admin, super_admin}
    bool super_admin_created = false;

     struct Obj {
        uint _prev;
        uint _next;
    }

    struct Person {
        string name;
        uint adr;
        UserType utype;

        mapping(uint => Obj) properties;
        uint propertiesTop;

        mapping(uint => Obj) requestList;
        uint requestListTop;
    }

    mapping(address => Person) users;


    modifier isAdmin() {
        if(users[msg.sender].utype == UserType.admin)
        _;
    }

    modifier isSuperAdmin() {
        if(users[msg.sender].utype == UserType.super_admin)
        _;
    }


  event newUserCreated(string name);
    // any user can
    function addUser(string memory _name, uint _adr, address _userId) public {

        // check if the user is previously registerd
        if(users[_userId].adr == uint(0)) {
            emit newUserCreated(_name);
            users[_userId].name = _name;
            users[_userId].adr = _adr;
            users[_userId].utype = UserType.user;

            users[_userId].requestListTop = 0;

            if(super_admin_created == false) {
                 users[_userId].utype = UserType.super_admin;
                 super_admin_created = true;
            }

        }


    }


    function getUser(address _userId) view public returns(string memory, uint, UserType) {
        // return username, aadhaar-number, user-domain
        return (users[_userId].name, users[_userId].adr, users[_userId].utype);
    }

    // function addProperty(address _userId, uint _prop_id) public {
    //     users[_userId].properties.push(_prop_id) -1;
    // }

    // function getProperty(address _userId, uint _prop_index) view public returns(uint) {
    //     return users[_userId].properties[_prop_index];
    // }

    // function getPropertyList(address _userId) view public returns(uint[] memory) {
    //     return users[_userId].properties;
    // }


    // function removeProperty(address _userId, uint _prop_index) public {
    //     delete users[_userId].properties[_prop_index];
    // }

    // function getPropertyLength(address _userId) view public returns(uint) {
    //     return users[_userId].properties.length;
    // }

    function changeUserDomain(address _userId, UserType _utype) public isSuperAdmin {
        users[_userId].utype = _utype;
    }

    function addPropertyRequest(address _userId, uint _req_id) public {
        users[_userId].requestList[users[_userId].requestListTop]._next = _req_id;

        users[_userId].requestList[_req_id]._prev = users[_userId].requestListTop;

        users[_userId].requestList[_req_id]._next = 0;

        users[_userId].requestListTop = _req_id;
    }

    function removePropertyRequest(address _userId, uint _req_id) public {
        if(users[_userId].requestListTop == _req_id) users[_userId].requestListTop = users[_userId].requestList[_req_id]._prev;

        users[_userId].requestList[users[_userId].requestList[_req_id]._prev]._next = users[_userId].requestList[_req_id]._next;

        users[_userId].requestList[_req_id]._next = 0;
        users[_userId].requestList[_req_id]._prev = 0;
    }

    function getNextPropertyRequestId(address _userId, uint _ptr) view public returns(uint) {
        return users[_userId].requestList[_ptr]._next;
    }





    function addProperty(address _userId, uint _req_id) public {
        users[_userId].properties[users[_userId].propertiesTop]._next = _req_id;

        users[_userId].properties[_req_id]._prev = users[_userId].propertiesTop;

        users[_userId].properties[_req_id]._next = 0;

        users[_userId].propertiesTop = _req_id;
    }

    function removeProperty(address _userId, uint _req_id) public {
        if(users[_userId].propertiesTop == _req_id) users[_userId].propertiesTop = users[_userId].properties[_req_id]._prev;

        users[_userId].properties[users[_userId].properties[_req_id]._prev]._next = users[_userId].properties[_req_id]._next;

        users[_userId].properties[_req_id]._next = 0;
        users[_userId].properties[_req_id]._prev = 0;
    }

    function getNextPropertyId(address _userId, uint _ptr) view public returns(uint) {
        return users[_userId].properties[_ptr]._next;
    }

}
