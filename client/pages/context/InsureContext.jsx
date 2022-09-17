import React from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { ethers } from "ethers";
// import { contractAbi, contractAddress } from "../utils/constants";

export const Web3Context = createContext();

// const getEthererumContract = () => {
//   const provider = new ethers.providers.Web3Provider(ethereum);
//   const signer = provider.getSigner();
//   const transactionContract = new ethers.Contract(
//     contractAddress,
//     contractAbi,
//     signer
//   );

//   return transactionContract;
// };
const InsureContext = ({ children }) => {
  const [contract, setContract] = useState(null);
  useEffect(() => {
    console.log(window);
    //setContract(getEthererumContract(window.ethereum));
  }, []);

  return (
    <Web3Context.Provider value={{ demo: "demo" }}>
      {children}
    </Web3Context.Provider>
  );
};

export default InsureContext;
