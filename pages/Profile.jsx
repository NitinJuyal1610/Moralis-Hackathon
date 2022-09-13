import React from "react";
import { useMoralis } from "react-moralis";
import Link from "next/link";
import { useRouter } from "next/router";

const Profile = () => {
  const { logout, isAuthenticated, user, isAuthenticating } = useMoralis();
  return (
    <div>
      <div>
        Gender: {user.get("gender")}
        <br />
        Username: {user.get("username")}
        <br />
        FullName: {user.get("fullName")}
        <br />
        Email: {user.get("email")}
        <br />
        PhoneNumber: {user.get("phoneNumber")}
        <br />
      </div>
      <div>
        <Link href="/Login">
          <button
            onClick={() => {
              logout();
              console.log(isAuthenticated);
            }}
            disabled={isAuthenticating}
          >
            Logout{console.log(isAuthenticated)}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
