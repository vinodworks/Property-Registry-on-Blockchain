let GovToken = artifacts.require("./GovToken.sol");
contract('GovToken', function(accounts){
  let token;
  const name = "GovToken";
  const symbol = "GovCoin";

  const account1=accounts[0];
  const tokenid1=111;
  const tokenuri1="this is the additional information about token 1";


  const account2=accounts[1];
  const tokenid2=211;
  const tokenuri2="this is the additional information about token 2";


  it('Should deploy contracts', async()=>{
    token = await GovToken.new(name,symbol);
    await token.mintuniquetokento(account1,tokenid1,tokenuri1,{from:accounts[0]});


    expect (await token.symbol).to.equal(symbol);
    expect (await token.name).to.equal(name);




  })





  });
