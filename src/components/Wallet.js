import { Button, Input } from "antd"

import React, {  useState } from "react"
import Paper from "./Paper"

import WalletInfo from "./WalletInfo"

const Wallet = () => {
    const [first, showFirst] = useState(true)
    const [second, showSecond] = useState(false)
    const [third, showThird] = useState(false)
    const secondDiv = () => {
        showFirst(false)
        showThird(false)
        showSecond(true)
    }
    const thirdDiv = () => {
        showSecond(false)
        showFirst(false)
        showThird(true)
    }
    return (
        <div className="wallet">
            <Paper />
            {first ? (
                <div data-aos="fade-in">
                    <WalletInfo
                        info={
                            "Paperwallet helps you make payments easily, keep your cards in one place and manage your money. Your next transaction is just one quick scan away."
                        }
                        text1={"Spend Paper Daily"}
                        text2={"The Easy Way"}
                    />
                    <div className="btn">
                        <Button onClick={secondDiv} className="register-btn">
                            Register
                        </Button>
                    </div>
                </div>
            ) : second ? (
                <div data-aos="fade-in">
                    <WalletInfo
                        info={"Sign up now to be the list to get notified when our app goes live"}
                        text1={"Join the waitlist"}
                        text2={"early acccess"}
                    />
                    <div className="btn-input">
                        <Input placeholder="Enter your email address" />
                        <Button onClick={thirdDiv} className="btn-notified">
                            Get Notified
                        </Button>
                    </div>
                </div>
            ) : third ? (
                <div data-aos="fade-in">
                    <WalletInfo
                        info={
                            "Send us an email at hello@paperwallet.tech or visit our social media pages to receive updates."
                        }
                        text1={"Congrats"}
                        text2={"You're on our waitling list"}
                    />
                </div>
            ) : (
                ""
            )}
        </div>
    )
}

export default Wallet
