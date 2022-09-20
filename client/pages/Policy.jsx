import React, { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import styles from "../styles/Policy.module.css";
import Disc from "./components/Disc";
import Calculator from "./components/Calculator";

const Policy = () => {
  const [coin, setCoin] = useState();
  const [years, setYears] = useState();
  const [amount, setAmount] = useState();
  // const [isSmallScreen, setIsSmallScreen] = useState("100%");

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
          <Calculator />
        </div>
      </section>
      <container className={styles.container}>
        <div className={styles.info_box}>
          <Disc />
        </div>
      </container>
    </>
  );
};

export default Policy;
