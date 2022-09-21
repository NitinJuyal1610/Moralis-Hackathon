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
    console.log("aggregator deployed");
    // Deploy the  contract.
    INSURANCE = await ethers.getContractFactory("insurance");
    insurance = await upgrades.deployProxy(INSURANCE, [aggregator.address], {
      kind: "uups",
    });
    await insurance.deployed();
    console.log("contract deployed");
    //distribute tokens
    DAI = await ethers.getContractFactory("InsureChain");
    dai = await DAI.attach(DAIPerUSD);

    // gib insuranceV1 contract allowance for Dai tokens.

    await dai.approve(
      insurance.address,
      ethers.utils.parseUnits("100000000000000000000000000000")
    );

    console.log("increased allowance");

    //add dai paymentCoin support
    await insurance.addNewpaymentCoin(DAIPerUSD, daiPricefeed, 1);
  });

  it("should be able to buy insurance", async function () {
    const nominee = addr1.address;
    const age = 30;
    const insuredAmount = 1000;
    const timeperiod = 10;
    const all = await dai.allowance(owner.address, insurance.address);

    console.log(all);
    await insurance.buyInsurance(1, nominee, age, insuredAmount, timeperiod, {
      gasLimit: 500000,
    });

    await dai.mint(
      insurance.address,
      ethers.utils.parseUnits("100000000000000000000000")
    );
    console.log("buyed insurance and minted");

    await insurance.claimInsurance(owner.address, 1, {
      gasLimit: 500000,
    });
    console.log("claim successfull");
  });
});
