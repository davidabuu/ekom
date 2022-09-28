import React, { useEffect, useState } from "react"
import { ConnectButton } from "web3uikit"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
import Link from "next/link"
import { Button, Input, notification } from "antd"
const NumberGameEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const [entranceFee, setEntranceFee] = useState("0")
    const [players, setPlayers] = useState("")
    const [entranceFeeMoney, setEntranceFeeMoney] = useState("0")
    const [recentWinner, setRecentWinner] = useState("0")
    const chainId = parseInt(chainIdHex)
    const [numGuess, setNumGuess] = useState(0)
    const dispatch = useNotification()
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
        functionName: "s_entranceFee",
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
            guessedNum: numGuess,
        },
    })

    const { runContractFunction: totalPlayers } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "getAllPlayers",
    })
    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi,
        contractAddress: gameAddress,
        functionName: "getRecentWinner",
    })
    const updateUI = async () => {
        const entranceFeeValue = await getEntranceFee()
        setEntranceFee(entranceFeeValue)
        const numberOfPlayers = await totalPlayers()
        const winner = await getRecentWinner()
        setRecentWinner(winner)
        setPlayers(numberOfPlayers.toString())
        setEntranceFeeMoney(entranceFeeValue.toString())
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])
    const EnterTheGame = async () => {
        await enterGame({
            onSuccess: handleSuccess,
        })
    }
    const handleSuccess = async (tx) => {
    notification.info({
        description:'Please wait while your transaction completes',
        placement:'topRight'
    })
        await tx.wait(1)
        notification.info({
            description:'Transaction Completed',
            placement:'topRight'
        })
        updateUI()
    }
  
    const waitNotification = () => {
        dispatch({
            type: "info",
            message: "Please while your transaction completes from your wallet",
            title: "Tx Notfication",
            position: "topR",
            icon: "bell",
        })
    }
    const youPassed = async (tx) => {
        waitNotification()
        await tx.wait(1)
        handleGuess(tx)
        updateUI()
    }
    const handleGuess = () => {
        dispatch({
            type: "info",
            message: "You passed congratulations",
            title: "Tx Notfication",
            position: "topR",
            icon: "bell",
        })
    }
    const youFailed = async (tx) => {
        notification.info({
            description:'Please wait while your transaction completes',
            placement:'topRight'
        })
            notification.info({
                description:'You failed Try Again',
                placement:'topRight'
            })
      
        updateUI()
    }

    

    const guessNumberFunction = async (e) => {
        e.preventDefault()
        await guessTheNumber({
            onSuccess: youPassed,
            onError: youFailed,
        })
    }
    return (
        <div>
            <div className="moralis-flex">
                <h1>Decentralized Number Guessing Game</h1>
                <ConnectButton moralisAuth={false} />
            </div>
            <p className="game-div">
                This is a simple number guessing game that enables users to guess the number and if
                it is correct you will be rewarded
            </p>
            {gameAddress ? (
                <div className="game-div">
                    <p>
                        Note: To play the game you have to pay{" "}
                        <b>{ethers.utils.formatUnits(entranceFeeMoney)} ETH </b>
                    </p>
                    <p>
                        Total Number of Players: <b>{players}</b>
                    </p>
                    <p>
                        Recent Winner : <b>{recentWinner}</b>
                    </p>
                    <div>
                        <Button
                            loading={isLoading || isFetching}
                            className="enter-btn"
                            onClick={EnterTheGame}
                        >
                            Enter The Game
                        </Button>
                    </div>
                    <br></br>
                    <form onSubmit={guessNumberFunction}>
                        <label>Guess the Number</label>
                        <br></br>
                        <Input
                            type="number"
                            className="input"
                            onChange={(e) => setNumGuess(e.target.value)}
                        />

                        <Button
                            htmlType="submit"
                            loading={loading || fetching}
                            className="guess-btn"
                        >
                            SUBMIT
                        </Button>
                    </form>
                </div>
            ) : (
                <p>
                    Please connect to your wallet to the <b>Goerli Testnet Network only</b>.{" "}
                    <Link href="https://blog.cryptostars.is/goerli-g%C3%B6rli-testnet-network-to-metamask-and-receiving-test-ethereum-in-less-than-2-min-de13e6fe5677">
                        <a>Need Help?</a>
                    </Link>
                </p>
            )}
        </div>
    )
}

export default NumberGameEntrance
