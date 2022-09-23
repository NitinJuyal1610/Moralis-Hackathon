# SmartInsure-insurance-CONTRACT
Under this Project ( Insurechain) we had designed the insurance products which are far more Efficient, Fast, Secure, Safe, Transparent or Trustworthy.  Than any other Web 2.0 Insurance products, which involve the human interference. </br>

As of now we have launched our only product - Term Life Insurance</br>

## Technology Stack & Tools

- Solidity (Writing Smart Contract)

- Javascript (Next.js & Testing)

- Ethers (Blockchain Interaction)

- Hardhat (Development Framework)

- Web3.storage & Moralis (storing & querying data)

## InsureChain.sol contarct

#### Custom ERC20 upgradable token:-"InsureChain" symbol :-"IC", this token is used for buying insurance & settling claims as of now.

- Contract deployed on Polygon Mumbai test network at:

> [InsureChain Contract Address](https://mumbai.polygonscan.com/address/0x98cC656e2dEb3706FCd073C236b12e7e919FecCF)

## chainlinkAggregator.sol contarct

#### chainlink price aggregator to get USD value of tokens.

- Contract deployed on Polygon Mumbai test network at:

> [chainlinkAggregator Contract Address](https://mumbai.polygonscan.com/address/0x62112087302d981159b8D46A812E05860fD2eF97)

## insurance.sol contarct

- Contract deployed on Polygon Mumbai test network at:

> [insurance Proxy Contract Address](https://mumbai.polygonscan.com/address/0xDa9974d844F56c02Ae274E2Ce2E157fC225F4b57) </br>  [insurance implementation Contract Address](https://mumbai.polygonscan.com/address/0x8e78EF7B43014404b1Ff5278E940231FFd6E38F9) </br>

#### Function addNewpaymentcoin

- lets only owner add new paymentcoin support </br>
- Tx hash:- [addNewpaymentcoin](https://mumbai.polygonscan.com/tx/0xfae1df0246212979c3d6be35bae0d32adb6549b998a1182f0e64977af5a9938a) </br>

#### Function buyInsurance

- lets users buy insurance </br>
- Tx hash:- [buyInsurance](https://mumbai.polygonscan.com/tx/0xf5a4cdf37985ef731fbc37d7e86a79132d308b025db9787c3ec084953a7ae6c7) </br>

#### Function payPremium

- users can pay premium, once they miss last premium date they cannot pay premium again as of now, would add fine functionality later</br>
- Tx hash:- [payPremium](https://mumbai.polygonscan.com/tx/0x2d43dc5d1b3b9eaf3af8c7139a5bf8a4e05eee8a7bc59df1e54f91e1560c5803) </br>

#### Function claimInsurance

- lets users buy insurance </br>
- Tx hash:- [claimInsurance](https://mumbai.polygonscan.com/tx/0xe74b83bc31dc3d86ab978dbd26bd75e2a457a8ff82787b16d9e62d8ed7ecef8a) </br>


## Requirements For Initial Setup

- Install NodeJS, should work with any node version below 16.5.0

- Install Hardhat

## Setting Up

1. Clone/Download the Repository </br>

> git clone https://github.com/NitinJuyal1610/Moralis-Hackathon.git

2. Install Dependencies:

> npm init --yes </br>

> npm install --save-dev hardhat </br>

> npm install dotenv --save </br>

3. Install Plugins:

> npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai </br>

> npm install --save-dev @nomiclabs/hardhat-etherscan </br>

> npm install @openzeppelin/contracts

4. Compile:

> npx hardhat compile

5. Migrate Smart Contracts

> npx hardhat run scripts/deploy.js --network <network-name>

6. Run Tests

> npx hardhat test

7. verify contract

> npx hardhat verify <contract address> --constructor-args --network <network-name>
