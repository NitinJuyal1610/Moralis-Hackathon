import React, { useState, useEffect, useContext } from "react";
import { useMoralis } from "react-moralis";
import styles from "../styles/Policy.module.css";
import { Web3Context } from "../context/InsureContext";
import { useRouter } from "next/router";

const Calculator = () => {
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

  const checkPrem = async (e) => {
    e.preventDefault();

    const premium = await checkPremium(age, amount, years);
    setPremium(premium.toString());
    setBuy(true);
  };

  const buyPrem = async (e) => {
    e.preventDefault();
    const nominee = (user?.get("NomineeAddress"))[0];
    console.log(1, nominee, age, amount, years);

    await buyInsurance(1, nominee, age, amount, years, {
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
      console.log(data1);
      setDisabled(data1.isInsured);
    })();
  }, []);

  return (
    <>
      <form className={styles.form}>
        <h1 className={styles.form_heading}>Customize Your Term Insurance </h1>
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

        <button
          className={styles.Btn}
          onClick={(e) => {
            checkPrem(e);
          }}
        >
          Create policy
        </button>
        <a
          className={styles.Btn2}
          href="https://ipfs.io/ipfs/bafybeiesflnsbv5tpqpmlt77kbrtdh2v736f6ntrjpwetyckont3j4tlt4/Policy%20Document..docx"
          passHref={true}
        >
          Download brochure
        </a>

        {buy ? (
          <div>
            <div className={styles.span}>Monthly Premium: {premium}$</div>{" "}
            {disabled ? null : (
              <button
                className={styles.Btn}
                onClick={(e) => {
                  buyPrem(e);
                }}
              >
                Buy
              </button>
            )}
          </div>
        ) : null}
      </form>
    </>
  );
};

export default Calculator;
