const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  // Deploy the  contract.
  const Insurechain = await ethers.getContractFactory("InsureChain");
  const insurechain = await upgrades.deployProxy(Insurechain, {
    kind: "uups",
  });
  await insurechain.deployed();

  const addr = await insurechain.owner();
  console.log("\n insurechain deployed at", addr, insurechain.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
