const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  const Pricefeed = "0x2bA49Aaa16E6afD2a993473cfB70Fa8559B523cF";
  const CoinPerUSD = "0xd0D5e3DB44DE05E9F294BB0a3bEEaF030DE24Ada";

  const insuranceV1ProxyContract = "0x4F36c5b22a095177cdab710c17B53746d2315507";

  const INSURANCE = await ethers.getContractFactory("insurance");
  const insurance = await INSURANCE.attach(insuranceV1ProxyContract);
  //add dai stablecoin support
  await insurance.addNewpaymentCoin(CoinPerUSD, Pricefeed, 1);
  console.log("\n stablecoin added");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
