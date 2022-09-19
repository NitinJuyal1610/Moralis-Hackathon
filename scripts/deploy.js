const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  // const daiPricefeed = "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF";
  // const DAIPerUSD = "0xc7AD46e0b8a400Bb3C915120d284AafbA8fc4735";

  const chainlinkaggregator = await ethers.getContractFactory(
    "chainlinkAggregator"
  );
  const aggregator = await chainlinkaggregator.deploy();
  await aggregator.deployed();

  console.log("\n chainlinkaggregator deployed at", aggregator.address);
  // Deploy the  contract.
  const INSURANCE = await ethers.getContractFactory("insurance");
  const insurance = await upgrades.deployProxy(
    INSURANCE,
    [aggregator.address],
    {
      kind: "uups",
    }
  );
  await insurance.deployed();
  console.log("\n insurance deployed at", insurance.address);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
