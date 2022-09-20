const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  const Pricefeed = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";
  const CoinPerUSD = "0x98cC656e2dEb3706FCd073C236b12e7e919FecCF";

  const insuranceV1ProxyContract = "0xf9f711873286B8848F436A2360EA8ed2Fa5d7739";

  const INSURANCE = await ethers.getContractFactory("insurance");
  const insurance = await INSURANCE.attach(insuranceV1ProxyContract);

  await insurance.addNewpaymentCoin(CoinPerUSD, Pricefeed, 1);

  console.log("\n stablecoin added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
