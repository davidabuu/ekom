import React from "react"
import { ConnectButton } from "web3uikit"
const Header = () => {
    //The moralisAuth means that we are not trying to connect to a server
    return (
        <div>
            Decontalized Number Guessing Game
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header
