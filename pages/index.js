import { Email, Facebook, Instagram, Twitter } from "@material-ui/icons"
import Header from "../src/components/Header"
import UserWebLayout from "../src/components/UserWebLayout"
import Wallet from "../src/components/Wallet"
import { LandingStyle } from "../styles/LandingPageStyle"

export default function Home() {
    return (
        <UserWebLayout webtitle="Home Page">
            <LandingStyle>
                <Header />
                <Wallet />
                <div className="socials">
                    <Email className="link" />
                    <Twitter className="link" />
                    <Instagram className="link" />
                </div>
            </LandingStyle>
        </UserWebLayout>
    )
}
