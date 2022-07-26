import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
function MyApp({ Component, pageProps }) {
  return (
    //The intializeOnMount is to hoo up to a server and have other funtions, but it is not needed
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
