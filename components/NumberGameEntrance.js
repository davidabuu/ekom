import React, { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
const NumberGameEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const [entranceFee, setEntranceFee] = useState("0")
    // const [entranceFeeShow, setEntranceFeeShow] = useState('')
    const dispatch = useNotification()
    const chainId = parseInt(chainIdHex)
    console.log(isWeb3Enabled)
    const gameAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const { runContractFunction: enterGame } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "enterGame",
        params: {},
        msgValue: entranceFee,
    })
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "getEntranceFee",
    })
    const { runContractFunction: guessTheNumber } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "guessTheNumber",
        params: {
            num: 5,
        },
    })
    const { runContractFunction: guessPlayers } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "totalNumberOfPlayers",
    })
    useEffect(() => {
        if (isWeb3Enabled) {
            const getEntranceFeeValue = async () => {
                const entranceFeeValue = (await getEntranceFee()).toString()
                setEntranceFee(entranceFeeValue)
                // setEntranceFeeShow(ethers.utils.formatUnits(entranceFeeShow, 'ether'))
            }
            getEntranceFeeValue()
        }
    }, [isWeb3Enabled])
    const EnterTheGame = async () => {
        await enterGame({
            onSuccess: handleSuccess,
            onError: (error) => console.log(error),
        })
    }
    const handleSuccess = async (tx) => {
        await tx.wait(1)
        handleNewNotification(tx)
    }
    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction Completed",
            title: "Tx Notfication",
            position: "topR",
            icon: "bell",
        })
    }
    const total = async () => {
        const res = (await guessPlayers()).toString()
        console.log(res)
    }
    const guessNumber = async () => {
        const result = (await guessTheNumber()).toString()
        console.log(result)
    }
    return (
        <div>
            <div>
                {gameAddress ? (
                    <div>
                        {" "}
                        To play you have to pay an entrance Fee of{" "}
                        {ethers.utils.formatUnits(entranceFee)} ETH
                    </div>
                ) : (
                    "No Address for this network it is only available on the rinkeby testnet"
                )}
            </div>
            <button onClick={EnterTheGame}>Enter Game</button>
            <button onClick={guessNumber}>Guess The Number</button>
            <button onClick={total}>Guess</button>
        </div>
    )
}

export default NumberGameEntrance
