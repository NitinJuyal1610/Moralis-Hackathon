import LaunchIcon from '@mui/icons-material/Launch';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'
import styles from '../styles/Hero.module.css'
import hero from '../static/Insurance-cuate.svg'
import moralisIcon from '../static/moralis.svg'
import hardhat from '../static/hardhat-logo-dark.484eb916.svg'
import ether from '../static/ether.js.svg'
import chainLink from '../static/chainlink.svg'

const Hero = () => {

    return (
        <>
            <section className={styles.section}>
                <div className={styles.div_hero}>
                    <div className={styles.flex}>
                        <h1 className={styles.heading_h1}>Buy Insurance from <em className={styles.heading_light}>Decentralized</em> Insurance Platform Insurechain</h1>
                        <h1 className={styles.heading_h2}>Customize Insurance Plan as you wish</h1>
                        <h1 className={styles.heading_h2}>Smart Contract based Claim process</h1>
                        <div className={styles.Btn_section}>
                            <Link href="/policy">
                                <button className={styles.btn}>See Plans</button>
                            </Link>
                            <Link href="/pogin">

                                <button className={styles.btn}>Login</button>
                            </Link>
                        </div>
                        <Link href="https://github.com/NitinJuyal1610/Moralis-Hackathon" passHref={true}>
                            <div className={styles.link_box}>
                                <a className={styles.git_link}>Github
                                </a>
                                <LaunchIcon className={styles.git_link} />
                            </div>
                        </Link>
                        <h1 className={styles.tagline}>Technology</h1>
                        <div className={styles.slider}>
                            <div className={styles.slide_track}>
                                <div className={styles.slide}>
                                    <Image src={moralisIcon} className={styles.logos} width="300px" height="100px" />
                                    <Image src={ether} className={styles.logos} width="300px" height="100px" />
                                    <Image src={chainLink} className={styles.logos} width="300px" height="100px" />
                                    <Image src={hardhat} className={styles.logos2} width="300px" height="110px" />
                                    <h1 className={styles.Tlogos}>Web3Storage</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.img_Flex}>
                        <Image className={styles.hero_img} width="700px" height="700px" src={hero} />

                    </div>

                </div>
            </section>
        </>
    )
}

export default Hero