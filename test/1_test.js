let User = artifacts.require("./User.sol");


contract('User', function (accounts) {
  var meta;
  let super_admin = accounts[0];
  let u_id_1 = accounts[1];

  it("should add User", function () {
    return User.deployed().then( (instance) => {
      meta = instance;
      return instance.addUser('Pankaj', 123456789, super_admin);
    }).then(()=>{
      return meta.getUser.call(accounts[0]);
    }).then(info => {
      console.log(info[0], `${info[1]}`, `${info[2]}`);
    });
  });

});


