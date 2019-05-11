let Cicada_3301 = artifacts.require("./Cicada_3301.sol");


contract('Cicada_3301', function (accounts) {
  var meta;
  let super_admin = accounts[0];
  let u_id_1 = accounts[1];

  it("should add User", function () {
    return Cicada_3301.deployed().then( (instance) => {
      meta = instance;
      return instance.addUser('vjhmgfng', 123456789, super_admin);
    }).then(()=>{
      return meta.getUser.call(accounts[0]);
    }).then(info => {
      console.log(info[0], `${info[1]}`, `${info[2]}`);
    });
  });




  it("create new property", function () {
    return Cicada_3301.deployed().then( (instance) => {
      meta = instance;
      return instance.createNewProperty(u_id_1, "first property", "fuft55435435", {from: super_admin});
    }).then(()=>{
      return meta.viewPropertyDetail.call(1, {from: super_admin});
    }).then(info => {
      console.log(info[0], `${info[1]}`, `${info[2]}`);
    });
  });

});


