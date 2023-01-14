import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='header'>
    <Image src='/logo.png' width={150} alt='Hola' height={30} objectFit='cover'/>
    </div>
  )
}

export default Header