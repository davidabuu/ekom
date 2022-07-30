import React, { useEffect } from "react"
import { useMoralis } from "react-moralis"

const Header = () => {
    const { enableWeb3, account, isWeb3Enabled, Moralis, isWeb3EnableLoading, deactivateWeb3 } =
        useMoralis()
    const EnableWeb3 = async () => {
        await enableWeb3()
        if (typeof window !== "undefined") {
            window.localStorage.setItem("connected", "injected")
        }
    }
    useEffect(() => {
        if (isWeb3Enabled) return
        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("connected")) {
                enableWeb3()
            }
        }
    }, [isWeb3Enabled])
    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            if (account == null) {
                window.localStorage.removeItem("connected")
                deactivateWeb3()
            }
        })
    })
    return (
        <div>
            {account ? (
                <div>Connected to {account}</div>
            ) : (
                <button disabled={isWeb3EnableLoading} onClick={EnableWeb3}>
                    Connect
                </button>
            )}
        </div>
    )
}

export default Header
