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
  const contractAddr = "0x98cC656e2dEb3706FCd073C236b12e7e919FecCF";
  StableCoin = await ethers.getContractFactory("InsureChain");
  stablecoin = await StableCoin.attach(contractAddr);
  await stablecoin.approve(
    insurance.address,
    ethers.utils.parseUnits("1000000000000000000000000000")
  );

  await stablecoin.increaseAllowance(
    insurance.address,
    ethers.utils.parseUnits("1000000000000000000000000000")
  );
  await stablecoin.mint(
    insurance.address,
    ethers.utils.parseUnits("1000000000000000000000000000")
  );

  console.log("allowance granted");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
