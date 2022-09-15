import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import ImageUploader from "react-image-upload";
import "react-image-upload/dist/index.css";
import Navbar from "./components/Navbar";
import styles from "../styles/profile.module.css";
import { FileUpload } from "./FileUpload";

const Profile = () => {
  const { logout, isAuthenticated, user, isAuthenticating } = useMoralis();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedFile, setSelectedFile] = useState({});
  const handleSubmission = async () => {
    FileUpload(selectedFile, user, "ProfileImage");
  };
  const [src, setSrc] = useState({});

  const enable = () => {
    setIsButtonDisabled(false);
  };
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phoneNumber: "",
    gender: "",
    password: "",
    ConPassword: "",
  });
  const {
    fullName,
    username,
    email,
    phoneNumber,
    gender,
    password,
    ConPassword,
  } = formData;
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
        { gender: gender },
        { fullName: fullName }
      );
      // signup(username, password, email, {
      //   phoneNumber: phoneNumber,
      //   gender: gender,
      //   fullName: fullName,
      // });
    }
  };

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.left_side}>
          <div className={styles.left_box}>
            <div>
              {typeof src === typeof {} ? (
                <ImageUploader
                  onFileAdded={(img) => setSelectedFile(img)}
                  onFileRemoved={() => () => {
                    setSrc({});
                  }}
                  style={{
                    height: 200,
                    width: 200,
                    background: "rgb(255,255,255)",
                  }}
                  deleteIcon={
                    <img
                      src="https://img.icons8.com/color/48/000000/multiply.png"
                      style={{ height: 20, width: 20 }}
                      alt=""
                      hidden={typeof src === typeof {}}
                    />
                  }
                  uploadIcon={
                    <img src="https://img.icons8.com/fluency/48/000000/add-image.png" />
                  }
                />
              ) : (
                <img className={styles.image} src={src} />
              )}
            </div>

            <h3 className={styles.name}>Name : {user?.get("fullName")}</h3>
            <h3 className={styles.gender}>Gender : {user?.get("gender")}</h3>
            <h3 className={styles.phoneNumber}>
              Mobile No. : {user?.get("phoneNumber")}
            </h3>
            <h3 className={styles.email}>Email : {user?.get("email")}</h3>
            {/* <h3 className={styles.nominee}>Email: {user?.get("email")}</h3> */}
          </div>
        </div>
        <div className={styles.center}>
          <div className={styles.form_box}>
            <form
              className={styles.form}
              onSubmit={(e) => handleSubmit(e)}
              action="#"
            >
              <div className={styles.user_details}>
                <div className={styles.input_box}>
                  <span className={styles.details}>Full Name</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder="Enter your name"
                    name="fullName"
                    value={fullName}
                    onChange={(e) => onChange(e)}
                    disabled={isButtonDisabled}
                  />
                </div>
                <div className={styles.input_box}>
                  <span className={styles.details}>Username</span>
                  <input
                    className={styles.input}
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Enter your username"
                    onChange={(e) => onChange(e)}
                    disabled={isButtonDisabled}
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
                    disabled={isButtonDisabled}
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
                    disabled={isButtonDisabled}
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
                    disabled={isButtonDisabled}
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
                    disabled={isButtonDisabled}
                  />
                </div>
              </div>

              <div className={styles.button}>
                <input type="submit" value="Register" />
              </div>
              <button className={styles.authButton} onClick={enable}>
                Edit
              </button>
            </form>
          </div>
        </div>
        <div className={styles.right}>
          <form
            className={styles.form}
            onSubmit={(e) => handleSubmit(e)}
            action="#"
          >
            <div className={styles.user_details}>
              <div className={styles.input_box}>
                <span className={styles.details}>Nominee</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder="Enter Nominee name"
                  name="nomineefullName"
                  // value={nomineefullName}
                  onChange={(e) => onChange(e)}
                  disabled={isButtonDisabled}
                />
              </div>
              <div className={styles.input_box}>
                <span className={styles.details}>Nominee Email</span>
                <input
                  className={styles.input}
                  type="text"
                  name="nomineeemail"
                  // value={nomineeemail}
                  placeholder="Enter Nominee email"
                  onChange={(e) => onChange(e)}
                  disabled={isButtonDisabled}
                />
              </div>
              <div className={styles.input_box}>
                <span className={styles.details}>Nominee Phone Number</span>
                <input
                  className={styles.input}
                  type="text"
                  name="nomineephoneNumber"
                  // value={nomineephoneNumber}
                  placeholder="Enter Nominee number"
                  onChange={(e) => onChange(e)}
                  disabled={isButtonDisabled}
                />
              </div>
            </div>

            <div className={styles.button}>
              <input type="submit" value="Add Nominee" />
            </div>
          </form>
        </div>
      </div>
      <div>
        {/* <Link href="/Login">
          <button
            onClick={() => {
              logout();
              console.log(isAuthenticated);
            }}
            disabled={isAuthenticating}
          >
            Logout{console.log(isAuthenticated)}
          </button>
        </Link> */}
      </div>
    </div>
  );
};

export default Profile;
