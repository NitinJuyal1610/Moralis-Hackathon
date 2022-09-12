import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from "../../styles/Navbar.module.css"

export const Navbar = () => {
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
                            <a className={styles.nav_link} href=''>Policies</a>
                        </Link>
                        <a className={styles.nav_link} href=''>Our Team</a>
                        <Link href="/Register" className={styles.User_Route}>
                            <button className={styles.Signup_btn}>Sign Up</button>
                        </Link>
                        {/* <button className='logout-btn' onClick={() => logout()} >Log out</button> */}

                    </li>
                </div>
            </div>
        </div>
    )
}

export default Navbar;