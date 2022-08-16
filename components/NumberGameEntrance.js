import React, { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import { Button } from "antd"
const NumberGameEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const [entranceFee, setEntranceFee] = useState("0")
    const [players, setPlayers] = useState("")
    // const [entranceFeeShow, setEntranceFeeShow] = useState('')
    const dispatch = useNotification()
    const chainId = parseInt(chainIdHex)
    console.log(isWeb3Enabled)
    const gameAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    const {
        runContractFunction: enterGame,
        isFetching,
        isLoading,
    } = useWeb3Contract({
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
    const {
        runContractFunction: guessTheNumber,
        isFetching: fetching,
        isLoading: loading,
    } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "guessTheNumber",
        params: {
            num: 5,
        },
    })
    const { runContractFunction: totalPlayers } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "totalNumberOfPlayers",
    })
    const updateUI = async () => {
        const entranceFeeValue = (await getEntranceFee()).toString()
        const getPlayers = (await totalPlayers()).toString()
        setPlayers(getPlayers)
        setEntranceFee(entranceFeeValue)
        // setEntranceFeeShow(ethers.utils.formatUnits(entranceFeeShow, 'ether'))
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
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
        updateUI()
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
    const youPassed = async (tx) => {
        await tx.wait(1)
        handleErrorNotification(tx)
        updateUI()
    }
    const handleErrorNotification = () => {
        dispatch({
            type: "error",
            message: "You Failed",
            title: "Tx Notfication",
            position: "topR",
            icon: "bell",
        })
    }
    const numGuess = async () => {
        await guessTheNumber({
            onSuccess: youPassed,
            onError: (error) => alert("You failed Try again"),
        })
    }
    return (
        <div className="game-div">
            <div>
                {gameAddress ? (
                    <div className="game-fee">
                        {" "}
                        <p>
                            {" "}
                            To play you have to pay an entrance Fee of{" "}
                            {ethers.utils.formatUnits(entranceFee)} ETH
                        </p>{" "}
                        <p>Total Number of players {players}</p>
                    </div>
                ) : (
                    "No Address for this network it is only available on the rinkeby testnet"
                )}
            </div>
            <div>
                <Button
                    loading={isLoading || isFetching}
                    className="enter-btn"
                    onClick={EnterTheGame}
                >
                    Enter The Game
                </Button>
            </div>
            <div>
                <Button loading={loading || fetching} className="guess-btn" onClick={numGuess}>
                    Guess The Number
                </Button>
            </div>
        </div>
    )
}

export default NumberGameEntrance
