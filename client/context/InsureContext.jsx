import React from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress, coinAbi } from "../utils/constants";

export const Web3Context = createContext();

const approve = async () => {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });

  const address = accounts[0];
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(address);
  const IcContract = new ethers.Contract(
    "0x98cC656e2dEb3706FCd073C236b12e7e919FecCF",
    coinAbi,
    signer
  );
  await IcContract.approve(
    contractAddress,
    ethers.utils.parseUnits("100000000000000000000000000000")
  );
};

const getEthererumContract = async () => {
  const accounts = await ethereum.request({
    method: "eth_requestAccounts",
  });
  console.log(accounts);
  const address = accounts[0];
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner(address);

  const transactionContract = new ethers.Contract(
    contractAddress,
    contractAbi,
    signer
  );

  return transactionContract;
};
const InsureContext = ({ children }) => {
  const buyInsurance = async (
    paymentCoinID,
    nominee,
    age,
    insuredAmount,
    timePeriod
  ) => {
    console.log(paymentCoinID, nominee, age, insuredAmount, timePeriod);

    const contract = await getEthererumContract(window.ethereum);
    try {
      await approve();
      const tx = await contract.buyInsurance(
        paymentCoinID,
        nominee,
        age,
        insuredAmount,
        timePeriod
      );

      console.log(tx);
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.waitForTransaction(tx.hash);
      const receipt = await provider.getTransactionReceipt(tx.hash);
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };

  const claim = async (owner, paymentCoinID) => {
    console.log(paymentCoinID, owner);
    const contract = await getEthererumContract(window.ethereum);

    try {
      await approve();
      const tx = await contract.claimInsurance(owner, paymentCoinID);

      console.log(tx);
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.waitForTransaction(tx.hash);
      const receipt = await provider.getTransactionReceipt(tx.hash);
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };

  const payPrem = async (paymentCoinID) => {
    console.log(paymentCoinID);
    const contract = await getEthererumContract(window.ethereum);
    try {
      await approve();
      const tx = await contract.payPremium(paymentCoinID);
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.waitForTransaction(tx.hash);
      const receipt = await provider.getTransactionReceipt(tx.hash);
      // console.log(receipt);
      console.log("Payed", receipt);
    } catch (e) {
      console.log(e);
    }
  };
  const checkPremium = async (age, amount, years) => {
    const contract = await getEthererumContract(window.ethereum);
    console.log(age, amount, years);

    const premium = await contract.calculatePremium(age, years, amount);
    return premium;
  };

  const getInfo = async () => {
    const contract = await getEthererumContract(window.ethereum);
    const data = await contract.getInsuranceInfo();
    return data;
  };
  return (
    <Web3Context.Provider
      value={{ checkPremium, buyInsurance, getInfo, payPrem, claim }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default InsureContext;
