import React from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
import { contractAbi, contractAddress } from "../utils/constants";

export const Web3Context = createContext();

const getEthererumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
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
    const contract = getEthererumContract(window.ethereum);
    try {
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
    const contract = getEthererumContract(window.ethereum);
    try {
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
    const contract = getEthererumContract(window.ethereum);
    try {
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
    const contract = getEthererumContract(window.ethereum);
    console.log(age, amount, years);

    const premium = await contract.calculatePremium(age, years, amount);
    return premium;
  };

  const getInfo = async () => {
    const contract = getEthererumContract(window.ethereum);
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
