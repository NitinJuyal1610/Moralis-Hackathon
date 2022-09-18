import React, { useState } from 'react'
import Navbar from "./components/Navbar"
import styles from "../styles/Policy.module.css"

const Policy = () => {
    const [coin, setCoin] = useState();
    const [years, setYears] = useState(0)
    const [amount, setAmount] = useState(0)


    return (
        <>
            <Navbar />
            <section className={styles.container}>
                <div className={styles.section}>
                    <form className={styles.form}>
                        <div className={styles.div}>
                            <span className={styles.span}>Enter Amount of Insurance in American $ :</span>
                            <input
                                className={styles.input}
                                type="text" id="currency-field" placeholder="$500,000.00"
                                name="Amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </div>
                        <div className={styles.div}>
                            <span className={styles.span}>Enter Time Period in Years:</span>
                            <input
                                className={styles.input}
                                type="year"
                                placeholder=""
                                name="years"
                                value={years}
                                onChange={(e) => setYears(e.target.value)}
                                required
                            />

                        </div>
                        <div className={styles.divSelect}>
                            <label for="payment" className={styles.label}>Choose a Coin:</label>
                            <select id="coins" name="coins" value={coin} className={styles.select} defaultValue={1} required onChange={(e) => setCoin(e.target.value)}>
                                <option className={styles.option} value={1}>USDC</option>
                                <option className={styles.option} value={2}>BTC</option>
                                <option className={styles.option} value={3}>ETH</option>
                            </select>
                        </div>
                        <button className={styles.Btn} >Check Amount</button>
                    </form>
                    <div className={styles.Output}>
                        <div className={styles.display_amount}>Final Amount:</div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Policy