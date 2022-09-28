import "../styles/globals.css"
import 'antd/dist/antd.css';
import { MoralisProvider } from "react-moralis"
import { NotificationProvider } from "web3uikit"
function MyApp({ Component, pageProps }) {
    return (
        //The intializeOnMount is to hoo up to a server and have other funtions, but it is not needed
        <MoralisProvider initializeOnMount={false}>
            <NotificationProvider>
                <Component {...pageProps} />
            </NotificationProvider>
        </MoralisProvider>
    )
}

export default MyApp
