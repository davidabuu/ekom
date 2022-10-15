import React from "react"
import Login from "../components/Register"
import UserWebLayout from "../components/UserWebLayout"

const UserLogin = () => {
    return (
        <UserWebLayout webtitle="Login">
            <Login />
        </UserWebLayout>
    )
}

export default UserLogin
