import React, { useState, useEffect, useContext } from "react";

import Navbar from "./components/Navbar";
import styles from "../styles/Policy.module.css";
import Disc from "./components/Disc";
import Calculator from "./components/Calculator";
import { Web3Context } from "./context/InsureContext";

const Policy = () => {
  const [coin, setCoin] = useState();
  const [years, setYears] = useState();
  const [amount, setAmount] = useState();
  // const [isSmallScreen, setIsSmallScreen] = useState("100%");
  const buy = true
  const buyPrem = async (e) => {
    e.preventDefault();
    const nominee = (user?.get("NomineeAddress"))[0];
    console.log(1, nominee, age, amount, years);

    await buyInsurance(1, nominee, age, amount, years, {
      gasLimit: 500000,
    });
  }
  // useEffect(() => {
  //     setIsSmallScreen(!window.matchMedia("(max-width: 700px)").matches ? "200px" : "100%");
  // }, []);
  return (
    <>
      <Navbar />
      <section className={styles.container}>
        <div className={styles.section}>
          <div className={styles.left_section}>
            <div className={styles.left_box}>
              <h4 className={styles.tagline}>
                World First <b className={styles.bold_text}>decentralized</b>{" "}
                Insurance
              </h4>
              <h2 className={styles.disc}>
                Stay Supremely Protected with{" "}
                <b className={styles.bold_text}>Smart Contract </b> based
                Insurance
              </h2>
              <div className={styles.plus_section}>
                <div className={styles.x_box}>
                  <div className={styles.img_back}>
                    <img
                      className={styles.pros_img}
                      src="../static/highlights_rider_benefits.svg"
                    />
                  </div>
                  <p className={styles.prosDisc}>
                    Customize policy with your needs
                  </p>
                </div>
                <div className={styles.x_box}>
                  <div className={styles.img_back}>
                    <img
                      className={styles.pros_img}
                      src="../static/lifecoverage_icon_compressed.svg"
                    />
                  </div>
                  <p className={styles.prosDisc}>
                    easy to buy, fast claim delivery with Smart Contract based
                    claim process
                  </p>
                </div>
                <div className={styles.x_box}>
                  <div className={styles.img_back}>
                    <img
                      className={styles.pros_img}
                      src="../static/pptcomponent_premiumpaymentterm_compressed.svg"
                    />
                  </div>
                  <p className={styles.prosDisc}>
                    Save your money with Tax free Insurance
                  </p>
                </div>
                <div className={styles.x_box}>
                  <div className={styles.img_back}>
                    <img
                      className={styles.pros_img}
                      src="../static/premium-payment.svg"
                    />
                  </div>
                  <p className={styles.prosDisc}>
                    Ease of payment with CryptoCurrency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Calculator />
      </section>
      <section className={styles.buy_policy}>
      </section>
      <container className={styles.container2}>
        <div className={styles.Policy_}><div className={styles.Policy_info}>
          <h1 className={styles.heading1}>Standard Plan</h1>
          <div className={styles.col_flex}>
            <div className={styles.row_flex}>
              <h2 className={styles.text_spacing}> Insurer  : Insurechain</h2>
              <h2 className={styles.text_spacing}> Life Cover : 40,000$</h2>
              <h2 className={styles.text_spacing}> Claim Settlement : 100%</h2>
            </div>
            <div className={styles.row_flex}>
              <h2 className={styles.text_spacing}> Time Period : 60 Years</h2>
              <h2 className={styles.text_spacing}> Monthly premium : 33.3 USD </h2>
            </div>
            {buy ? (
              <div>
                <button
                  className={styles.Btn}
                  onClick={(e) => {
                    buyPrem(e);
                  }}
                >
                  Buy
                </button>
              </div>
            ) : null}
          </div>
        </div>
        </div>
        <div className={styles.info_box}>
          <Disc />
        </div>
      </container >
    </>
  );
};

export default Policy;
