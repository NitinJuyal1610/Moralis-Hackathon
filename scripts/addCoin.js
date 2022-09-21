const { ethers } = require("hardhat");

async function main() {
  const [owner, addr1] = await ethers.getSigners();
  const Pricefeed = "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0";
  const CoinPerUSD = "0x98cC656e2dEb3706FCd073C236b12e7e919FecCF";

  const insuranceV1ProxyContract = "0x03397a95C102f031d19e0b7bb75306db6052D375";

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
