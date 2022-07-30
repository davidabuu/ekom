import React, { useEffect, useState } from "react"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { abi, contractAddress } from "../constants"
import { ethers } from "ethers"
import {useNotification} from 'web3uikit'
const LotteryEntrance = () => {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const [entranceFee, setEntranceFee] = useState("0")
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainIdHex in contractAddress ? contractAddress[chainId][0] : null
    const { runContractFunction: enterRaffle } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    })
    const dispatch = useNotification(  )
    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })
    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString()
                setEntranceFee(ethers.utils.formatUnits(entranceFeeFromCall))
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    const handleSuccess = async function (tx){
        await tx.wait(1)
        handleNewNotifcation(tx)
    }
    const handleNewNotifcation  = () => {
        dispatch({
            type:'info',
            message:'Transaction Complete',
            title:'Tx Notification',
            position:'topR',
            icon:'bell'
        })
    }
    return (
        <div>
            Hi from lottery entrance:
            <button onClick={async function(){
                await enterRaffle({
                    onSuccess: handleSuccess,
                    onError:(error) => console.log(error)
                })
            }}>Enter Raffle</button>
            {raffleAddress ? (
                <div>Entrance Fee {ethers.utils.formatUnits(entranceFee, "ether")}</div>
            ) : (
                <div>No Raffle Address Detected</div>
            )}
        </div>
    )
}

export default LotteryEntrance
