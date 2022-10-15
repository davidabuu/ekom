import Head from "next/head"
import Header from "../components/Header"
import UserWebLayout from "../components/UserWebLayout"

export default function Home() {
    return (
        <div>
            <UserWebLayout webtitle="Home Page">
                <Header />
            </UserWebLayout>
        </div>
    )
}
