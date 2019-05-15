const Migrations = artifacts.require("Migrations");
const KuiperDatabase = artifacts.require("KuiperDatabase");

module.exports = function(deployer) {
  //deployer.deploy(Migrations);
  deployer.deploy(KuiperDatabase);
};
