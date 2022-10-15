import { Button, Card, Col, Input, Row, Select } from "antd"
import React from "react"
import UserWebLayout from "./UserWebLayout"

const Login = () => {
    const { Option } = Select
    const LoginCandidate = (e) => {
        e.preventDefault()
    }
    return (
        <div style={{ backgroundColor: "#1b5958", minHeight: "100vh" }}>
            <UserWebLayout webtitle="Add Candidate">
                <div className="form">
                    <form onSubmit={LoginCandidate}>
                        <h2>LOGIN</h2>
                        <div>
                            <div>
                                <label>Matric Number</label>
                                <br></br>
                                <Input type="text" placeholder="Enter FullName" required />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>Password</label>
                                <br></br>
                                <Input type="password" required />
                            </div>
                        </div>

                        <br></br>
                        <div>
                            <Button className="login-btn" htmlType="submit">
                                LOGIN
                            </Button>
                        </div>
                    </form>
                </div>
            </UserWebLayout>
        </div>
    )
}

export default Login
