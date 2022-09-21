import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import styles from "../styles/Login.module.css";
import Navbar from "./components/Navbar";
// import { useMoralis } from 'react-moralis'

const Login = () => {
  const router = useRouter();

  const {
    login,
    isAuthenticated,
    authenticate,
    isWeb3Enabled,
    enableWeb3,
    isWeb3EnableLoading,
  } = useMoralis();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const { user, } = useMoralis()
  useEffect(() => {
    if (!isWeb3Enabled) {
      enableWeb3();
    }
  }, []);

  if (isWeb3EnableLoading) return <>loading</>;
  else
    return (
      <>
        <Navbar />
        {isAuthenticated ? (
          <>
            <div>
              <form className={styles.login_form}>
                <h1>Login</h1>
                <div className={styles.content}>
                  <div className={styles.input_field}>
                    <input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      autocomplete="nope"
                    />
                  </div>
                  <div className={styles.input_field}>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      autocomplete="new-password"
                    />
                  </div>
                </div>
                <div className={styles.action}>
                  <Link href="/Register" className={styles.User_Route}>
                    <button>Register</button>
                  </Link>
                  <button
                    onClick={() => {
                      try {
                        login(username, password, {
                          onError: () => {
                            alert("Wrong Username/Password");
                            throw "Wrong Username/Password";
                          },

                          onSuccess: () => {
                            setTimeout(function () {
                              router.push("/Profile");
                            }, 1000);
                          },
                        });
                      } catch (error) {
                        console.log(error);
                      }
                    }}
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </>
        ) : (
          <>
            <div className={styles.body}>
              <button
                className={styles.authButton}
                onClick={() =>
                  authenticate({ signingMessage: "Moralis Authentication" })
                }
              >
                Authenticate
              </button>
            </div>
          </>
        )}
      </>
    );
};

export default Login;
