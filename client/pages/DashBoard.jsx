import React, { useState } from 'react'
import Navbar from './components/Navbar'
import styles from "../styles/dash.module.css"
import { style } from '@mui/system'
import Calculator from './components/Calculator'
import Disc from './components/Disc'
const DashBoard = () => {

    const [popUp, setPopUp] = useState(false)
    const handleToggle = () => {
        setPopUp(!popUp)
    }
    return (
        <><section className={styles.body}>

            <Navbar />
            <section className={styles.section_flex}>
                <div className={styles.panel_component} >
                    <div className={styles.panel_box}>
                        <h2 className={styles.h2}>Your Policy Details</h2>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Name of policy holder :</h3>
                            <h3 className={styles.values}>Abhishek</h3>
                        </span>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Name of Nominee :</h3>
                            <h3 className={styles.values}>Nitin</h3>
                        </span>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Address of Policy holder :</h3>
                            <h3 className={styles.values}>0x3243t5</h3>
                        </span>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Insured Amount :</h3>
                            <h3 className={styles.values}>24000</h3>
                        </span>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Pay Till Age :</h3>
                            <h3 className={styles.values}>60</h3>
                        </span>
                        <span className={styles.span}>
                            <h3 className={styles.key}>Next Premium Date :</h3>
                            <h3 className={styles.values}>22/09/22</h3>
                        </span>
                        <div className={styles.action}>
                            <button className={styles.btn}>Pay Premium</button>
                            <button className={styles.btn} onClick={() => handleToggle()}>Claim Insurance</button>
                        </div>
                    </div>
                </div>
                <div className={styles.Calculator_box}>
                    <Calculator />
                </div>
                <div className={styles.flex_right}>
                    {popUp ? (<form className={styles.form} type="submit">
                        <label className={styles.label}>Enter Nominee Address</label>
                        <input className={styles.input} type="text" placeholder='Nominee Address' required />
                        <label className={styles.label}>Enter Death Certificate No.</label>
                        <input className={styles.input} type="text" placeholder="Death certificate" required />
                        <input className={styles.submit_btn} type="submit" value="submit" />
                    </form>) : null}
                </div>
            </section>
            <div className={styles.disc}>
                <Disc />

            </div>
        </section>
        </>
    )
}

export default DashBoard