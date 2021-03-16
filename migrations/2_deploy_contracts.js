const DLibrary = artifacts.require("DLibrary");

module.exports = function(deployer) {
  deployer.deploy(DLibrary);
};
