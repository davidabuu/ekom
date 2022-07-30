import React from "react"
import { ConnectButton } from "web3uikit"
const Header2 = () => {
    return (
        <div>
            Decontalized Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}

export default Header2
