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
  const [contract, setContract] = useState(null);
  useEffect(() => {
    const cont = getEthererumContract(window.ethereum);
    setContract(cont);
  }, []);

  const buyInsurance = async (
    paymentCoinID,
    nominee,
    age,
    insuredAmount,
    timePeriod
  ) => {
    console.log(paymentCoinID, nominee, age, insuredAmount, timePeriod);

    try {
      const tx = await contract.buyInsurance(
        paymentCoinID,
        nominee,
        age,
        insuredAmount,
        timePeriod,
        {
          gasLimit: 5000000,
        }
      );
      console.log(contract);
      console.log(tx);
      const provider = new ethers.providers.Web3Provider(ethereum);
      await provider.waitForTransaction(tx.hash);
      const receipt = await provider.getTransactionReceipt(tx.hash);
      console.log(receipt);
    } catch (e) {
      console.log(e);
    }
  };
  const checkPremium = async (age, amount, years) => {
    console.log(age, amount, years);

    const premium = await contract.calculatePremium(age, years, amount);
    return premium;
  };

  const addCoin = async (coinAddress, priceFeed, id) => {
    console.log(coinAddress, priceFeed, id);

    await contract.addNewpaymentCoin(coinAddress, priceFeed, id);
  };
  return (
    <Web3Context.Provider
      value={{ demo: "demo", checkPremium, buyInsurance, addCoin }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default InsureContext;
