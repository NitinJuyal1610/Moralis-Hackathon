import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import styles from "../../styles/Navbar.module.css";
import { useMoralis } from "react-moralis";
import { Web3Context } from "../context/InsureContext";
import { useRouter } from "next/router";

export const Navbar = () => {
  const { user, isAuthenticated, isAuthenticating, logout } = useMoralis();
  const { buyInsurance, payPrem, getInfo, checkPremium } =
    useContext(Web3Context);

  const { isWeb3Enabled, enableWeb3 } = useMoralis();

  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (!isWeb3Enabled) enableWeb3();
    (async () => {
      const data1 = await getInfo();
      setDisabled(data1.isInsured);
    })();
  }, []);

  return (
    <div className={styles.nav_component}>
      <div className={styles.nav_items}>
        <div className={styles.logo_component}>
          <div className={styles.logo}>
            <div id={styles.brandlogo} style={{ width: 50, height: 50 }} />
          </div>
          <div className={styles.logo_name}>
            <h3 className={styles.logo_text}>Insurechain</h3>
          </div>
        </div>
        <div className={styles.nav_item}>
          <li className={styles.nav_links}>
            <Link href="/Policy" className={styles.Policy_Route}>
              <a className={styles.nav_link} href="">
                Policies
              </a>
            </Link>
            <a className={styles.nav_link} href="">
              Our Team
            </a>
            <>
              {user ? (
                <>
                  <Link href="/">
                    <button
                      className={styles.Signup_btn}
                      onClick={() => {
                        logout();
                        router.push("/Policy");
                      }}
                      disabled={isAuthenticating}
                    >
                      Logout
                    </button>
                  </Link>
                  {disabled && (
                    <Link href="/DashBoard" className={styles.User_Route}>
                      <button className={styles.Signup_btn}>Dashboard</button>
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/Login" className={styles.User_Route}>
                  <button className={styles.Signup_btn}>Sign Up/login</button>
                </Link>
              )}
            </>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
