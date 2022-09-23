// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.8;

/// @title upgradable-smartInsurance-contract
/// @author OMKAR N CHOUDHARI
/// @notice You can use this contract for only the most basic simulation
/// @dev All function calls are currently implemented without side effects
/// @custom:experimental This is an experimental contract.

import "./chainlinkAggregator.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "hardhat/console.sol";

contract insurance is OwnableUpgradeable, UUPSUpgradeable {
    using SafeERC20Upgradeable for IERC20Upgradeable;

    chainlinkAggregator aggregator;

    address[] public listOfSupportedpaymentCoinAddress;

    event nomineeUpdated(address indexed owner, address indexed newNominee);

    event insuranceBought(
        address indexed owner,
        uint256 paymentCoinId,
        uint256 insuredAmount
    );

    struct paymentCoin {
        address paymentCoinAddress;
        address priceFeed;
        uint256 listPointer;
        uint256 paymentCoinId;
    }

    struct InsuranceHolder {
        address owner;
        address nominee;
        uint256 insuranceStartTimeStamp;
        uint256 lastPremiumPaidTimeStamp;
        uint256 nextPremiumTimeStamp;
        uint256 timePeriod;
        uint256 insuredAmount;
        uint256 premium;
        uint256 premiumPaid;
        uint256 paymentCoinId;
        bool isInsured;
        bool isTerminated;
    }

    ///@dev maps from paymentCoin ID to properties of the paymentCoin stored in struct
    mapping(uint256 => paymentCoin) public ListOfpaymentCoins;

    ///@dev paymentCoinIds stored in array
    uint256[] private paymentCoinIds;

    ///@dev maps from user address to => paymentCoinID => properties of user
    mapping(address => InsuranceHolder) public ListOfInsuranceHolders;

    function initialize(address _chainlinkAggregatorAddress)
        external
        initializer
    {
        __Ownable_init();
        __UUPSUpgradeable_init();

        aggregator = chainlinkAggregator(_chainlinkAggregatorAddress);
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        view
        override
        onlyOwner
    {}

    function paymentCoinExists(
        address _paymentCoinAddress,
        uint256 _paymentCoinId
    ) internal view returns (bool success) {
        if (paymentCoinIds.length == 0) return false;
        return (paymentCoinIds[
            ListOfpaymentCoins[_paymentCoinId].listPointer
        ] ==
            _paymentCoinId &&
            ListOfpaymentCoins[_paymentCoinId].paymentCoinAddress ==
            _paymentCoinAddress);
    }

    /// @notice lets only owner add new paymentCoin support
    /// @dev location of listpointer can change hence ID of paymentCoin was used as key
    /// @param _paymentCoinAddress contract address of the paymentCoin to add
    /// @param _priceFeed chainlink pricefeed of paymentCoin/USD pair
    /// @param _paymentCoinId  id of the paymentCoin which can be used to access the paymentCoin properties
    function addNewpaymentCoin(
        address _paymentCoinAddress,
        address _priceFeed,
        uint256 _paymentCoinId
    ) external onlyOwner {
        require(
            !paymentCoinExists(_paymentCoinAddress, _paymentCoinId),
            "addNewpaymentCoin: paymentCoin with this Id or address already exists"
        );

        ListOfpaymentCoins[_paymentCoinId]
            .paymentCoinAddress = _paymentCoinAddress;
        ListOfpaymentCoins[_paymentCoinId].paymentCoinId = _paymentCoinId;
        ListOfpaymentCoins[_paymentCoinId].priceFeed = _priceFeed;
        paymentCoinIds.push(_paymentCoinId);
        ListOfpaymentCoins[_paymentCoinId].listPointer =
            paymentCoinIds.length -
            1;
    }

    /// @notice lets owner remove paymentCoin support
    /// @dev deadline parameter could be hardcoded in contract
    /// @param _paymentCoinAddress contract address of the paymentCoin to add
    /// @param _paymentCoinId  id of the paymentCoin which can be used to access the paymentCoin properties
    function removepaymentCoin(
        address _paymentCoinAddress,
        uint256 _paymentCoinId
    ) external onlyOwner {
        require(
            paymentCoinExists(_paymentCoinAddress, _paymentCoinId),
            "addNewpaymentCoin: paymentCoin with this Id does not exist"
        );

        uint256 keyToDelete = ListOfpaymentCoins[_paymentCoinId].listPointer;
        uint256 keyToMove = paymentCoinIds[paymentCoinIds.length - 1];
        paymentCoinIds[keyToDelete] = keyToMove;
        ListOfpaymentCoins[keyToMove].listPointer = uint256(keyToDelete);
        paymentCoinIds.pop();
        delete ListOfpaymentCoins[_paymentCoinId];
    }

    function calculateTimeElapsed(uint256 insuranceStartTimeStamp)
        internal
        view
        returns (uint256 timeElapsed)
    {
        return block.timestamp - insuranceStartTimeStamp;
    }

    /// @notice lets users buy insurance
    /// @dev msg.sender is stored in local variable to save gas.
    /// @param _paymentCoinID  id of the paymentCoin which can be used to access the paymentCoin properties
    /// @param _nominee address of nominee who can claim insrance
    /// @param _age  current age of insured user
    /// @param _insuredAmount amount of money in us dollars for which the user is insured
    /// @param  _timePeriod amount of time user is insured in years
    function buyInsurance(
        uint256 _paymentCoinID,
        address _nominee,
        uint256 _age,
        uint256 _insuredAmount,
        uint256 _timePeriod
    ) public {
        address paymentCoinAddress = ListOfpaymentCoins[_paymentCoinID]
            .paymentCoinAddress;

        address msgSender = msg.sender; // on hold
        uint256 premium = calculatePremium(_age, _timePeriod, _insuredAmount);

        InsuranceHolder storage insuranceHolder = ListOfInsuranceHolders[
            msgSender
        ];

        require(
            paymentCoinExists(paymentCoinAddress, _paymentCoinID),
            "addNewpaymentCoin: paymentCoin with this Id does not exist"
        );
        require(
            insuranceHolder.isInsured == false,
            "buyInsurance: you are already Insured"
        );

        require(
            IERC20Upgradeable(paymentCoinAddress).balanceOf(msgSender) >
                premium,
            "you have insufficient funds in your wallet"
        );

        address priceFeed = ListOfpaymentCoins[_paymentCoinID].priceFeed;
        uint256 amount = amountOfCoinsToSend(priceFeed, premium) * 10**18;

        ListOfInsuranceHolders[msgSender] = InsuranceHolder(
            msgSender, // on hold
            _nominee,
            block.timestamp,
            block.timestamp,
            block.timestamp + 31 days,
            _timePeriod,
            _insuredAmount,
            premium,
            premium,
            _paymentCoinID,
            true,
            false
        );

        IERC20Upgradeable(paymentCoinAddress).approve(address(this),amount);
        IERC20Upgradeable(paymentCoinAddress).safeTransferFrom(
            msgSender, // on hold
            address(this),
            (amount)
        );
        emit insuranceBought(msgSender, _paymentCoinID, _insuredAmount);
    }

    function calculateRecoveryPercentage(uint256 age)
        internal
        pure
        returns (uint256)
    {
        if (age < 24) return 50;
        else if (age < 30) return 60;
        else if (age < 40) return 70;
        else return 80;
    }

    function calculatePremium(
        uint256 _age,
        uint256 _timePeriodInYears,
        uint256 _insuredAmount
    ) public pure returns (uint256) {
        uint256 recoveryPercentage = calculateRecoveryPercentage(_age);
        uint256 denominator = 100 * _timePeriodInYears * 365 days;
        uint256 premium = (_insuredAmount * recoveryPercentage * 30 days) /
            denominator;
        return premium;
    }

    /// @notice function calculates the amountOfCoinsToSend based on USD value of tokens
    /// @dev 1000 multiplied to priceOfPaymentCoin get precision upto 3 decimal points
    /// @param priceFeed chainlink pricefeed of paymentCoin/USD pair
    /// @param _premium the amount of premium user has to pay.
    /// @return "uint256" returns the amount of tokens to send
    function amountOfCoinsToSend(address priceFeed, uint256 _premium)
        internal
        view
        returns (uint256)
    {
        uint256 priceOfpaymentCoin = uint256(
            aggregator.getLatestPrice(priceFeed) * 1000
        );
        console.log(priceOfpaymentCoin, "priceOfpaymentCoin");
        uint256 decimalsDenominator = uint256(
            10**aggregator.decimals(priceFeed)
        );
        uint256 usdValueOfPaymentCoins = priceOfpaymentCoin /
            decimalsDenominator;
        console.log(_premium, "premium");
        console.log(usdValueOfPaymentCoins, "usdValueOfPaymentCoins");

        uint256 amount = (_premium * 1000) / usdValueOfPaymentCoins;
        console.log(amount, "amount");

        return amount;
    }

    /// @notice function to update nominee
    /// @dev updates ListOfInsuranceHolders mapping
    /// @param _newNominee address of new nominee
    function updateNominee(address _newNominee) external {
        address msgSender = msg.sender;
        InsuranceHolder storage insuranceHolder = ListOfInsuranceHolders[
            msgSender
        ];

        require(
            insuranceHolder.owner == msgSender,
            "changeNominee: you are not the owner of the insurance"
        );

        require(
            insuranceHolder.nominee != _newNominee,
            "changeNominee: you cannot appoint the same nominee "
        );

        ListOfInsuranceHolders[msgSender].nominee = _newNominee;
        emit nomineeUpdated(msgSender, _newNominee);
    }

    /// @notice users can pay premium, once theymiss last premium date they cannot par premium again
    /// @dev 
    /// @param _paymentCoinID  id of the paymentCoin which can be used to access the paymentCoin properties
    function payPremium(uint256 _paymentCoinID) external {
        address paymentCoinAddress = ListOfpaymentCoins[_paymentCoinID]
            .paymentCoinAddress;

        address msgSender = msg.sender; // on hold

        InsuranceHolder storage insuranceHolder = ListOfInsuranceHolders[
            msgSender
        ];
        uint256 premium = insuranceHolder.premium;

        require(
            paymentCoinExists(paymentCoinAddress, _paymentCoinID),
            "addNewpaymentCoin: paymentCoin with this Id does not exist"
        );
        require(
            block.timestamp < insuranceHolder.nextPremiumTimeStamp,
            "you missed the previous premium payment"
        );
        require(
            insuranceHolder.isInsured == true,
            "buyInsurance: you are not Insured, buy insurance first"
        );

        require(
            IERC20Upgradeable(paymentCoinAddress).balanceOf(msgSender) >
                premium,
            "you have insufficient funds in your wallet"
        );

        address priceFeed = ListOfpaymentCoins[_paymentCoinID].priceFeed;
        uint256 amount = amountOfCoinsToSend(priceFeed, premium) * 10**18;
        uint256 currentTimeStamp = block.timestamp;
        IERC20Upgradeable(paymentCoinAddress).approve(address(this),amount);
        IERC20Upgradeable(paymentCoinAddress).safeTransferFrom(
            msgSender, // on hold
            address(this),
            amount
        );

        ListOfInsuranceHolders[msgSender]
            .lastPremiumPaidTimeStamp = currentTimeStamp;

        uint256 paidPremium = ListOfInsuranceHolders[msgSender].premiumPaid;
        paidPremium = paidPremium + premium;
        ListOfInsuranceHolders[msgSender].premiumPaid = paidPremium;

        ListOfInsuranceHolders[msgSender].nextPremiumTimeStamp += 31 days;
    }

    function getInsuranceInfo() public view returns (InsuranceHolder memory) {
        return ListOfInsuranceHolders[msg.sender];
    }

    /// @notice claim can only be passed by the owner of the contract 
    /// @dev setting insured amount after claim to 0 is not mandatory & is done for safety reasons
    /// @param owner address of insured owner
    /// @param _paymentCoinID id of the paymentCoin which can be used to access the paymentCoin properties
    function claimInsurance(address owner, uint256 _paymentCoinID)
        external
    {
        InsuranceHolder storage insuranceHolder = ListOfInsuranceHolders[owner];
        address paymentCoinAddress = ListOfpaymentCoins[_paymentCoinID]
            .paymentCoinAddress;

        require(
            insuranceHolder.isInsured == true,
            "changeNominee: you are not insured"
        );
        address nominee = insuranceHolder.nominee;
        uint256 insuredAmount = insuranceHolder.insuredAmount*10**18;
        IERC20Upgradeable(paymentCoinAddress).approve(address(this),insuredAmount);
        IERC20Upgradeable(paymentCoinAddress).transferFrom(
            address(this), // on hold
            nominee,
            insuredAmount
        );
        ListOfInsuranceHolders[owner].isInsured = false;
        ListOfInsuranceHolders[owner].insuredAmount = 0;
    }
}
