import React from 'react'

const WalletInfo = ({text1, text2, info}) => {
  return (
    <div className='wallet-info'>
        <h1 className='text-one'>{text1}</h1>
        <h1 className='text-two'>{text2}</h1>
        <p>{info}</p>
    </div>
  )
}

export default WalletInfo