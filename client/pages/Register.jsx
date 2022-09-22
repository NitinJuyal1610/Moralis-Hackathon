import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import styles from "../styles/Register.module.css";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
const Register = () => {
  const { authenticate, isAuthenticated, signup } = useMoralis();
  const router = useRouter();
  // const [userLogged,setUserLogged] =useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
    ConPassword: "",
  });
  const { username, email, phoneNumber, gender, password, ConPassword } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === ConPassword) {
      console.log(
        username,
        password,
        email,
        { phoneNumber: phoneNumber },
        { gender: gender }
      );
      const DeathCertNumber = "65875325412330025";
      signup(
        username,
        password,
        email,
        {
          phoneNumber: phoneNumber,
          gender: gender,
          DeathCertNumber: DeathCertNumber,
        },
        {
          onError: () => {
            throw "Something Went Wrong";
          },

          onSuccess: () => {
            console.log("done");
            setTimeout(function () {
              router.push("/Profile");
            }, 500);
          },
        }
      );
    }
  };

  return (
    <>
      <Navbar />
      {isAuthenticated ? (
        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.title}>Registration</div>
            <div className={styles.content}>
              <form
                className={styles.form}
                onSubmit={(e) => handleSubmit(e)}
                action="#"
              >
                <div className={styles.user_details}>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Username</span>
                    <input
                      className={styles.input}
                      type="text"
                      name="username"
                      value={username}
                      placeholder="Enter your username"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Email</span>
                    <input
                      className={styles.input}
                      type="text"
                      name="email"
                      value={email}
                      placeholder="Enter your email"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Phone Number</span>
                    <input
                      className={styles.input}
                      type="text"
                      name="phoneNumber"
                      value={phoneNumber}
                      placeholder="Enter your number"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Gender</span>
                    <input
                      className={styles.input}
                      type="text"
                      name="gender"
                      value={gender}
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Password</span>
                    <input
                      className={styles.input}
                      type="password"
                      name="password"
                      value={password}
                      placeholder="Enter your password"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                  <div className={styles.input_box}>
                    <span className={styles.details}>Confirm Password</span>
                    <input
                      className={styles.input}
                      type="password"
                      name="ConPassword"
                      value={ConPassword}
                      placeholder="Confirm your password"
                      onChange={(e) => onChange(e)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.button}>
                  <input type="submit" value="Register" />
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Register;
