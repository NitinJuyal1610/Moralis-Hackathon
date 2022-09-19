// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract chainlinkAggregator {
    function getLatestPrice(address addr) public view returns (int) {
            (
                /*uint80 roundID*/,
                int price,
                /*uint startedAt*/,
                /*uint timeStamp*/,
                /*uint80 answeredInRound*/
            ) = AggregatorV3Interface(addr).latestRoundData();
            return price;
        }

        function decimals(address addr) external view returns (uint8) {
            return AggregatorV3Interface(addr).decimals();
        }

}