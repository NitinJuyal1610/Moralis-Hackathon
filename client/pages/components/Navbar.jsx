import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import styles from "../../styles/Navbar.module.css";
import { useMoralis } from "react-moralis";

export const Navbar = () => {
  const { user, isAuthenticated, isAuthenticating, logout } = useMoralis();
  var policy = true
  // const [matches, setMatches] = useState(
  //   window.matchMedia("(min-width: 480px)").matches
  // )
  // useEffect(() => {
  //   window
  //     .matchMedia("(min-width: 480px)")
  //     .addEventListener('change', e => setMatches(e.matches));
  // }, []);
  // // window.addEventListener('load', () => {
  // window.onload = function () {
  //   const togglebtn = document.querySelector(".nav_toggle")
  //   console.log(togglebtn)
  //   togglebtn.addEventListener('click', togglefunction)
  // }
  // function togglefunction() {
  //   var nav = document.querySelector(".nav_item")
  //   nav.classList.add("active")
  // }

  // })

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
                      }}
                      disabled={isAuthenticating}
                    >
                      Logout
                    </button>
                  </Link>
                  {policy && <Link href="/DashBoard" className={styles.User_Route}>
                    <button className={styles.Signup_btn}>Dashboard</button>
                  </Link>
                  }
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
