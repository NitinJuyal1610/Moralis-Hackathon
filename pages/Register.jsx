import React, { useEffect, useState } from 'react'
// import { useMoralis } from "react-moralis";

import styles from "../styles/Register.module.css"
const Register = () => {
    const [user, setUser] = useState("")
    // const { authenticate, isAuthenticated, user } = useMoralis();
    const authenticate = () => {
        setUser("asc")
    }

    // const [userLogged,setUserLogged] =useState(false)
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phoneNumber: "",
        gender: "",
        password: "",
        ConPassword: "",
    })
    const { fullName,
        username,
        email,
        phoneNumber,
        gender,
        password,
        ConPassword, } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value })
    const onSubmit = e => {
        e.preventDefault();
        if (password === ConPassword) {
            console.log(fullName,
                username,
                email,
                phoneNumber,
                gender,
                password,
                ConPassword,)
        }

    }

    return (
        <>
            {user ? (
                <div className={styles.body}>
                    <div className={styles.container}>
                        <div className={styles.title}>Registration</div>
                        <div className={styles.content}>
                            <form className={styles.form} onSubmit={e => onSubmit(e)} action="#">
                                <div className={styles.user_details}>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Full Name</span>
                                        <input className={styles.input}
                                            type="text" placeholder="Enter your name" name='fullName'
                                            value={fullName} onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Username</span>
                                        <input className={styles.input} type="text" name='username'
                                            value={username} placeholder="Enter your username" onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Email</span>
                                        <input className={styles.input} type="text" name='email'
                                            value={email} placeholder="Enter your email" onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Gender</span>
                                        <input className={styles.input} type="text" name='phoneNumber'
                                            value={phoneNumber} placeholder="" onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Phone Number</span>
                                        <input className={styles.input} type="text" name='gender'
                                            value={gender} placeholder="Enter your number" onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Password</span>
                                        <input className={styles.input} type="text" name='password'
                                            value={password} placeholder="Enter your password" onChange={e => onChange(e)} required />
                                    </div>
                                    <div className={styles.input_box}>
                                        <span className={styles.details}>Confirm Password</span>
                                        <input className={styles.input} type="text" name='ConPassword'
                                            value={ConPassword} placeholder="Confirm your password" onChange={e => onChange(e)} required />
                                    </div>
                                </div>

                                <div className={styles.button}>
                                    <input type="submit" value="Register" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            ) : (<div className={styles.body}>
                <button className={styles.authButton} onClick={authenticate}>Authenticate</button>

            </div>)
            }
        </>
    )
}

export default Register