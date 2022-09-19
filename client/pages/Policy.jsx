import React, { useState, useEffect, useContext } from "react";
import Navbar from "./components/Navbar";
import styles from "../styles/Policy.module.css";
import { Web3Context } from "./context/InsureContext";
import { useMoralis } from "react-moralis";
import InsuranceInfo from "./InsuranceInfo";
const Policy = () => {
  const [coin, setCoin] = useState(1);
  const [years, setYears] = useState();
  const [amount, setAmount] = useState();
  const [age, setAge] = useState();
  const [premium, setPremium] = useState();
  const [insured, setInsured] = useState(false);
  const { checkPremium, buyInsurance, addCoin } = useContext(Web3Context);
  const { user, enableWeb3, isWeb3Enabled } = useMoralis();
  const findPremium = async (e) => {
    e.preventDefault();
    const data = await checkPremium(age, amount, years);
    setPremium(parseInt(data._hex, 16));
  };

  const BuyInsurance = async (e) => {
    e.preventDefault();
    const nominee = (user?.get("NomineeAddress"))[0];

    //for usdc
    const coinAddress = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";
    const priceFeed = "0xfE4A8cc5b5B2366C1B58Bea3858e81843581b2F7";
    try {
      // await addCoin(coinAddress, priceFeed, 1);

      await buyInsurance(coin, nominee, age, amount, years);
      console.log("successFully Buyed Insurance");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, []);

  return (
    <>
      <Navbar />
      {!insured ? (
        <section className={styles.container}>
          <div className={styles.section}>
            <form className={styles.form}>
              <div className={styles.div}>
                <span className={styles.span}>
                  Enter Amount of Insurance in American $ :
                </span>
                <input
                  className={styles.input}
                  type="text"
                  id="currency-field"
                  placeholder="$500,000.00"
                  name="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>
              <div className={styles.div}>
                <span className={styles.span}>Enter Time Period in Years:</span>
                <input
                  className={styles.input}
                  type="year"
                  placeholder=""
                  name="years"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  required
                />
              </div>

              <div className={styles.div}>
                <span className={styles.span}>Enter Your Age:</span>
                <input
                  className={styles.input}
                  type="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                />
              </div>
              <div className={styles.divSelect}>
                <label for="payment" className={styles.label}>
                  Choose a Coin:
                </label>
                <select
                  id="coins"
                  name="coins"
                  value={coin}
                  className={styles.select}
                  defaultValue={1}
                  required
                  onChange={(e) => setCoin(e.target.value)}
                >
                  <option className={styles.option} value={1}>
                    USDC
                  </option>
                  <option className={styles.option} value={2}>
                    BTC
                  </option>
                  <option className={styles.option} value={3}>
                    ETH
                  </option>
                </select>
              </div>
              <button
                className={styles.Btn}
                onClick={(e) => {
                  findPremium(e);
                }}
              >
                Check Amount
              </button>
            </form>
            <div className={styles.Output}>
              <div className={styles.display_amount}>
                Final Amount:{premium}$
              </div>
            </div>

            <div>
              <button
                className={styles.Btn}
                onClick={(e) => {
                  BuyInsurance(e);
                }}
                hidden={!premium}
              >
                Buy Insurance
              </button>
            </div>
          </div>
        </section>
      ) : (
        <InsuranceInfo />
      )}
    </>
  );
};

export default Policy;
