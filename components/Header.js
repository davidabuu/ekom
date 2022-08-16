import React from "react"
import { ConnectButton } from "web3uikit"
const Header = () => {
    //The moralisAuth means that we are not trying to connect to a server
    return (
        <div>
            <div className="header">
                <h1>Number Guessing Game</h1>
                </div>
                <div className="moralis-flex">
                    <h1>Decentralized Number Guessing Game</h1>
                    <ConnectButton moralisAuth={false} />
                </div>
            
        </div>
    )
}

export default Header
