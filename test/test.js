const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers, upgrades } = require("hardhat");

describe(" insurance", () => {
  let owner;
  let addr1;
  let addr2;
  let dai;
  let DAI;
  const daiPricefeed = "0x572dDec9087154dC5dfBB1546Bb62713147e0Ab0";
  let chainlinkaggregator;
  let aggregator;

  let INSURSNCE;
  let insurance;
  const DAIPerUSD = "0x98cC656e2dEb3706FCd073C236b12e7e919FecCF";
  const USDCPerUSD = "0xa24de01df22b63d23Ebc1882a5E3d4ec0d907bFB";
  beforeEach(async () => {
    [owner, addr1, ...addrs] = await ethers.getSigners();

    chainlinkaggregator = await ethers.getContractFactory(
      "chainlinkAggregator"
    );
    aggregator = await chainlinkaggregator.deploy();
    await aggregator.deployed();
    // Deploy the  contract.
    INSURANCE = await ethers.getContractFactory("insurance");
    insurance = await upgrades.deployProxy(INSURANCE, [aggregator.address], {
      kind: "uups",
    });
    await insurance.deployed();

    //distribute tokens
    DAI = await ethers.getContractFactory("InsureChain");
    dai = await DAI.attach(DAIPerUSD);

    // gib insuranceV1 contract allowance for Dai tokens.
    dai.connect(addr1).approve(insurance.address, 1000 * 10 ** 18);
    dai.approve(insurance.address, 1000 * 10 ** 18);

    //add dai paymentCoin support
    await insurance.addNewpaymentCoin(DAIPerUSD, daiPricefeed, 1);
  });
  

  it("should be able to buy insurance", async function () {
    const nominee = addr1.address;
    const age = 30;
    const insuredAmount = 10000;
    const timeperiod = 10;

    await insurance.buyInsurance(1, nominee, age, insuredAmount, timeperiod, {
      gasLimit: 500000,
    });
  });
});
