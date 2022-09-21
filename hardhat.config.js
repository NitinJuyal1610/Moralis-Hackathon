require("@nomiclabs/hardhat-waffle");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
const ALCHEMY_URL = process.env.NEXT_PUBLIC_ALCHEMY_URL;
const PRIVATE_KEY1 = process.env.NEXT_PUBLIC_PRIVATE_KEY1;
const PRIVATE_KEY2 = process.env.NEXT_PUBLIC_PRIVATE_KEY2;

module.exports = {
  solidity: "0.8.9",
  networks: {
    mumbai: {
      url: ALCHEMY_URL,
      accounts: [`0x${PRIVATE_KEY1}`, `0x${PRIVATE_KEY2}`],
      gasPrice: 50000000000,
    },

    hardhat: {
      forking: {
        url: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
      },
    },
  },
  etherscan: {
    apiKey: {
      polygonMumbai: process.env.NEXT_PUBLIC_API_KEY,
    },
  },
 
};
