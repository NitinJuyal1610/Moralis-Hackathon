import React, { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import styles from "../../styles/Policy.module.css";
import { Web3Context } from "../context/InsureContext";
import { useRouter } from "next/router";

const Calculator = () => {
  const [coin, setCoin] = useState(1);
  const [years, setYears] = useState();
  const [amount, setAmount] = useState();
  const [age, setAge] = useState();
  const [premium, setPremium] = useState("");
  const [buy, setBuy] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const { user } = useMoralis();
  const { buyInsurance, payPrem, getInfo, checkPremium } =
    useContext(Web3Context);

  const router = useRouter();
  //   const test = async (e) => {
  //     e.preventDefault();
  //     const nominee = "0xb6cc336d792c5f3f5684e68666c3de2a4532bdc6";
  //     const age = 30;
  //     const insuredAmount = 10000;
  //     const timeperiod = 10;
  //     await buyInsurance(1, nominee, age, insuredAmount, timeperiod, {
  //       gasLimit: 500000,
  //     });
  //     const data1 = await getInfo();
  //     console.log(data1);
  //     // await payPrem(1);
  //     // const data2 = await getInfo();
  //     // console.log(data2);
  //   };

  const checkPrem = async (e) => {
    e.preventDefault();

    const premium = await checkPremium(age, amount, years);
    setPremium(premium.toString());
    setBuy(true);
  };

  const buyPrem = async (e) => {
    e.preventDefault();
    const nominee = (user?.get("NomineeAddress"))[0];
    console.log(coin, nominee, age, amount, years);

    await buyInsurance(coin, nominee, age, amount, years, {
      gasLimit: 500000,
    });

    const data1 = await getInfo();
    if (data1.isInsured) {
      router.push("/DashBoard");
    }
  };

  useEffect(() => {
    (async () => {
      const data1 = await getInfo();
      setDisabled(data1.isInsured);
    })();
  }, []);

  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.form_heading}>Term Insurance Calculator</h1>
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
          <span className={styles.span}>Enter Your Age:</span>
          <input
            className={styles.input}
            type="age"
            placeholder=""
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
        <div className={styles.divSelect}>
          <label for="payment" className={styles.span}>
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
            checkPrem(e);
          }}
        >
          Check policy
        </button>

        {buy ? (
          <div>
            <div className={styles.span}>Monthly Premium: {premium}$</div>{" "}
            <button
              hidden={disabled}
              className={styles.Btn}
              onClick={(e) => {
                buyPrem(e);
              }}
            >
              Buy
            </button>
          </div>
        ) : null}
      </form>
    </>
  );
};

export default Calculator;
