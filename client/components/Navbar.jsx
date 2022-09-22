import Link from "next/link";
import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "../styles/Navbar.module.css";
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
  const [menuIcon, setMenuIcon] = useState(false);
  const [nav, setNav] = useState(false);
  const ham_nav = useRef(0);
  const size = useWindowSize();
  useEffect(() => {
    size.width < 800 ? setMenuIcon(true) : setMenuIcon(false);
  }, [size.width]);

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });
    useEffect(() => {
      if (typeof window !== "undefined") {
        function handleResize() {
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          });
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  return (
    <div className={styles.nav_component}>
      <div className={styles.nav_items}>
        <div className={styles.logo_component}>
          <div className={styles.logo}>
            <div id={styles.brandlogo} style={{ width: 50, height: 50 }} />
          </div>
          <div className={styles.logo_name}>
            <Link href={"/"}>
              <h3 className={styles.logo_text}>Insurechain</h3>
            </Link>
          </div>
        </div>
        <div className={styles.nav_item}>
          <li className={styles.nav_links}>
            <Link href="/policy" className={styles.Policy_Route}>
              <a className={styles.nav_link} href="">
                Policies
              </a>
            </Link>
            <Link className={styles.Policy_Route} href="/profile">
              <a className={styles.nav_link} href="">
                Profile
              </a>
            </Link>
            <>
              {user && user.get("email") ? (
                <>
                  <Link href="/">
                    <button
                      className={styles.Signup_btn}
                      onClick={() => {
                        logout();
                        router.push("/policy");
                      }}
                      disabled={isAuthenticating}
                    >
                      Logout
                    </button>
                  </Link>
                  {disabled && (
                    <Link href="/dashBoard" className={styles.User_Route}>
                      <button className={styles.Signup_btn}>Dashboard</button>
                    </Link>
                  )}
                </>
              ) : (
                <Link href="/login" className={styles.User_Route}>
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
