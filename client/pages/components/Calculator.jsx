import React, { useState } from 'react'
import styles from "../../styles/Policy.module.css"

const Calculator = () => {
    const [coin, setCoin] = useState();
    const [years, setYears] = useState()
    const [amount, setAmount] = useState()
    const [buy, setBuy] = useState(false);

    return (
        <>
            <form className={styles.form}>
                <h1 className={styles.form_heading}>Term Insurance Calculator</h1>
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
                    <label for="payment" className={styles.span}>Choose a Coin:</label>
                    <select id="coins" name="coins" value={coin} className={styles.select} defaultValue={1} required onChange={(e) => setCoin(e.target.value)}>
                        <option className={styles.option} value={1}>USDC</option>
                        <option className={styles.option} value={2}>BTC</option>
                        <option className={styles.option} value={3}>ETH</option>
                    </select>
                </div>
                <button className={styles.Btn} onClick={() => { setBuy(true) }}>Check policy</button>
                {buy ? (
                    <button className={styles.Btn}>Buy</button>
                ) : null}
            </form>
        </>
    )
}

export default Calculator
