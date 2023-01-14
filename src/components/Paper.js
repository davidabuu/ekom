import Image from "next/image"
import React from "react"

const Paper = () => {
    return (
        <div>
            <Image src="/phone.png" alt="Hello" width={600} height={500} objectFit="contain" />
        </div>
    )
}

export default Paper
