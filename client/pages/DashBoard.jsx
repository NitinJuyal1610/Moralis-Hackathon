import React, { useState, useContext, useEffect } from "react";
import Navbar from "./components/Navbar";
import styles from "../styles/dash.module.css";
import { style } from "@mui/system";
import { useMoralis } from "react-moralis";
import Calculator from "./components/Calculator";
import { Web3Context } from "./context/InsureContext";
import Disc from "./components/Disc";
import Router, { useRouter } from "next/router";
const DashBoard = () => {
  const [popUp, setPopUp] = useState(false);
  const [data, setData] = useState(null);
  const [userNum, setUserNum] = useState(null);
  const { user, isWeb3Enabled, enableWeb3 } = useMoralis();
  const handleToggle = () => {
    setPopUp(!popUp);
  };

  function getDate(unixTime) {
    const date = new Date(unixTime * 1000);
    return date.toLocaleDateString();
  }

  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
    (async () => {
      const data1 = await getInfo();
      console.log(data1);
      setData(data1);
    })();
  }, []);

  const { buyInsurance, payPrem, getInfo, claim } = useContext(Web3Context);
  const router = useRouter();
  const payPremium = async (e) => {
    e.preventDefault();
    await payPrem(1);
    console.log("payed");
    const data1 = await getInfo();
    setData(data1);
  };

  const CheckandClaim = async (e) => {
    e.preventDefault();
    const num = user?.get("DeathCertNumber");
    if (num == userNum) {
      try {
        await claim(data.owner, 1);
        console.log("claimed SuccessFully");
        router.push("/Policy");
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("could not claim now");
    }
  };
  return (
    <>
      <section className={styles.body}>
        <Navbar />
        <section className={styles.section_flex}>
          <div className={styles.panel_component}>
            <div className={styles.panel_box}>
              <h2 className={styles.h2}>Your Policy Details</h2>
              <span className={styles.span}>
                <h3 className={styles.key}>Name of policy holder :</h3>
                <h3 className={styles.values}>{user?.get("username")}</h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Name of Nominee :</h3>
                <h3 className={styles.values}>{user?.get("NomineeName")}</h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Address of Policy holder :</h3>
                <h3 className={styles.values}>
                  {`${user?.get("NomineeAddress")}`.substring(0, 15)}....
                </h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Insured Amount :</h3>
                <h3 className={styles.values}>
                  {`${data?.insuredAmount}`?.toString()}$
                </h3>
              </span>

              <span className={styles.span}>
                <h3 className={styles.key}>Pay Till Age :</h3>
                <h3 className={styles.values}>
                  {`${data?.timePeriod}`.toString()}
                </h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Next Premium Date :</h3>
                <h3 className={styles.values}>
                  {getDate(`${data?.nextPremiumTimeStamp}`.toString())}
                </h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Monthly Premium Amount :</h3>
                <h3 className={styles.values}>
                  {`${data?.premium}`.toString()}$
                </h3>
              </span>
              <span className={styles.span}>
                <h3 className={styles.key}>Premium Paid :</h3>
                <h3 className={styles.values}>
                  {`${data?.premiumPaid}`.toString()}$
                </h3>
              </span>
              <div className={styles.action}>
                <button
                  className={styles.btn}
                  onClick={(e) => {
                    payPremium(e);
                  }}
                >
                  Pay Premium
                </button>
                <button className={styles.btn} onClick={() => handleToggle()}>
                  Claim Insurance
                </button>
              </div>
            </div>
          </div>
          <div className={styles.Calculator_box}>
            <Calculator />
          </div>
          <div className={styles.flex_right}>
            {popUp ? (
              <form className={styles.form} type="submit">
                <label className={styles.label}>
                  Enter Death Certificate No.
                </label>
                <input
                  className={styles.input}
                  type="text"
                  value={userNum}
                  onChange={(e) => setUserNum(e.target.value)}
                  placeholder="Death certificate"
                  required
                />
                <input
                  className={styles.submit_btn}
                  type="submit"
                  value="submit"
                  onClick={(e) => {
                    CheckandClaim(e);
                  }}
                />
              </form>
            ) : null}
          </div>
        </section>
        <div className={styles.disc}>
          <Disc />
        </div>
      </section>
    </>
  );
};

export default DashBoard;
