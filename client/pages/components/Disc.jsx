import React, { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from '../../styles/Disc.module.css'

const Disc = () => {
    return (
        <Accordion className={styles.Accordion}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"

            >
                <Typography className={styles.title}>disclaimer :</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className={styles.text}>
                    1 *Option available with Life and Maturity Plus option.
                </Typography>
                <Typography className={styles.text}>
                    2 ^Applicable for Term Life Insurance.
                </Typography>
                <Typography className={styles.text}>
                    3 **Under Term Life and Maturity Plus Option, an amount of coverage  Increase by 5%
                    shall be payable at the end of the Policy Term, provided the life assured survives till maturity and the policy is not terminated earlier.
                </Typography>
                <Typography className={styles.text}>
                    4 ^^Income Tax benefits would be available as per the prevailing income tax laws, subject to law of particular country,
                    in which amount of coverage will get claim. Please consult your own tax consultant to know the tax benefits as per your country concern.
                </Typography>
                <Typography className={styles.text}>
                    5 Issuer Rating represents opinion on ability to pay policy-holder obligations and claims in a timely manner for an insurance company.
                </Typography>
                <Typography className={styles.text}>
                    6 +This plan offers pure risk premium option under Life Option and return of premium benefit under Life and Maturity Plus  Option along with other benefits. Please refer Policy Conditions for complete details
                </Typography>
                <Typography className={styles.text}>
                    7 This product is underwritten by Insurechain. This plan is not a guaranteed issuance plan and it will be subject to Company&apos;s underwriting and acceptance.
                </Typography>
                <Typography className={styles.text}>
                    8 Insurance cover is available under this product. For more details on risk factors, terms and conditions please read Policy conditions carefully before concluding a sale.
                </Typography>
                <Typography className={styles.text}>
                    9 extra premiums will be charged as per our underwriting guidelines in policy document.
                </Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default Disc