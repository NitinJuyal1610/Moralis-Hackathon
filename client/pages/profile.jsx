import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import "react-image-upload/dist/index.css";
import Navbar from "../components/Navbar";
import styles from "../styles/profile.module.css";
import { FileUpload } from "../components/FileUpload";
import { useRouter } from "next/router";

const Profile = () => {
  const { user } = useMoralis();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleSubmission = async (img) => {
    await FileUpload(img, user, "ProfileImage");
    window.location.reload();
  };

  const enable = () => {
    setIsButtonDisabled(false);
  };

  const router = useRouter();

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
        user.set("NomineeAddress", [NomineeAddress]);
      } else {
        user.addUnique("NomineeAddress", NomineeAddress);
      }
    }

    if (NomineeName.length) {
      if (user?.get("NomineeName")) {
        user.set("NomineeName", [NomineeName]);
      } else {
        user.addUnique("NomineeName", NomineeName);
      }
    }

    user.save();

    router.push("/policy");
  };

  return (
    <div>
      <Navbar />
      <div className={styles.body}>
        <div className={styles.left_side}>
          <div className={styles.left_box}>
            <div>
              {user?.get("ProfileImage") ? (
                <img className={styles.image} src={user.get("ProfileImage")} />
              ) : (
                //add image uploader

                <div>
                  <img className={styles.image} src="/img.jpg"></img>
                  <br />
                  <input
                    onChange={(e) => {
                      handleSubmission(e.target.files);
                    }}
                    type="file"
                    id="files"
                    hidden={true}
                  />
                  <label className={styles.upload} for="files">
                    Select Profile Image
                  </label>
                </div>
              )}
            </div>

            <p className={styles.name}>
              <b>Name :</b>
              {user?.get("username")}
            </p>
            <p className={styles.gender}>
              <b>Gender :</b> {user?.get("gender")}
            </p>
            <p className={styles.phoneNumber}>
              <b>Mobile No. :</b> {user?.get("phoneNumber")}
            </p>
            <p className={styles.email}>
              <b>Email : </b>
              {user?.get("email")}
            </p>
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
            <div className={styles.Nominee_form}>
              <h1>Add Nominee</h1>
              <div className={styles.user_details}>
                <div className={styles.input_box}>
                  <span className={styles.details}>Nominee</span>
                  <input
                    className={styles.input}
                    type="text"
                    placeholder={user?.get("NomineeName") && [0]}
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
                    placeholder={user?.get("NomineeAddress") && [0]}
                    onChange={(e) => onChange(e)}
                    disabled={isButtonDisabled}
                  />
                </div>
              </div>

              <div className={styles.button}>
                <input type="submit" value="Add Nominee" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
