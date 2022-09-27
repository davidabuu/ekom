import Head from "next/head"
import Header from "../components/Header"
import NumberGameEntrance from "../components/NumberGameEntrance"
import styles from "../styles/Home.module.css"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Number Guessing Game</title>
                <meta name="description" content="My Number Guessing Game" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <NumberGameEntrance/>
        </div>
    )
}
