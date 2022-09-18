import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import "react-image-upload/dist/index.css";
import Navbar from "./components/Navbar";
import styles from "../styles/profile.module.css";
import { FileUpload } from "./components/FileUpload";

const Profile = () => {
  const { user } = useMoralis();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmission = async (img) => {
    await FileUpload(img, user, "ProfileImage");
  };

  const enable = () => {
    setIsButtonDisabled(false);
  };

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    NomineeName: "",
    NomineeAddress: "",
  });
  const { username, email, phoneNumber, NomineeName, NomineeAddress } =
    formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const UpdateInfo = (e) => {
    e.preventDefault();
    console.log(username, email, { phoneNumber: phoneNumber });

    if (username.length) {
      user.set("username", username);
    }

    if (phoneNumber.length) {
      user.set("phoneNumber", phoneNumber);
    }

    if (email.length) {
      user.set("email", email);
    }

    user.save();
  };

  const NomineeInfo = (e) => {
    e.preventDefault();
    console.log(NomineeName, NomineeAddress);
    if (NomineeAddress.length) {
      if (user?.get("NomineeAddress")) {
        user.set("NomineeAddress", NomineeAddress);
      } else {
        user.addUnique("NomineeAddress", NomineeAddress);
      }
    }

    if (NomineeName.length) {
      if (user?.get("NomineeName")) {
        user.set("NomineeName", NomineeName);
      } else {
        user.addUnique("NomineeName", NomineeName);
      }
    }

    user.save();
  };

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.left_side}>
          <div className={styles.left_box}>
            <div>
              {user?.get("ProfileImage") ? (
                <img
                  className={styles.image}
                  src={user.get("ProfileImage")[0]}
                />
              ) : (
                //add image uploader
                <div>
                  <input
                    onChange={(e) => {
                      handleSubmission(e.target.files);
                    }}
                    type="file"
                    id="files"
                    hidden={true}
                  />
                  <label className={styles.upload} for="files">
                    Select file
                  </label>
                </div>
              )}
            </div>

            <h3 className={styles.name}>Name : {user?.get("username")}</h3>
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
              onSubmit={(e) => UpdateInfo(e)}
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
                    placeholder={user?.get("username")}
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
                    placeholder={user?.get("email")}
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
                    placeholder={user?.get("phoneNumber")}
                    onChange={(e) => onChange(e)}
                    disabled={isButtonDisabled}
                  />
                </div>
              </div>

              <div className={styles.button}>
                <input type="submit" value="Save" />
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
            onSubmit={(e) => NomineeInfo(e)}
            action="#"
          >
            <div className={styles.user_details}>
              <div className={styles.input_box}>
                <span className={styles.details}>Nominee</span>
                <input
                  className={styles.input}
                  type="text"
                  placeholder={user?.get("NomineeName")}
                  name="NomineeName"
                  value={NomineeName}
                  onChange={(e) => onChange(e)}
                  disabled={isButtonDisabled}
                />
              </div>

              <div className={styles.input_box}>
                <span className={styles.details}>Nominee Wallet Address</span>
                <input
                  className={styles.input}
                  type="text"
                  name="NomineeAddress"
                  value={NomineeAddress}
                  placeholder={user?.get("NomineeAddress")}
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
      <div></div>
    </div>
  );
};

export default Profile;