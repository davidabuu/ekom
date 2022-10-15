import { Button, Card, Col, Input, Row, Select } from "antd"
import React from "react"
import UserWebLayout from "./UserWebLayout"

const AddCandidate = () => {
    const { Option } = Select
    const RegisterCandidate = () => {
        alert("Hola")
    }
    return (
        <div style={{ backgroundColor: "#1b5958", minHeight: "100vh" }}>
            <UserWebLayout webtitle="Add Candidate">
                <div className="form">
                <form onSubmit={RegisterCandidate}>
                    <h2>REGISTER A CANDIDATE</h2>
                    <div className="input-flex">
                        <div>
                            <label>FullName</label>
                            <br></br>
                            <Input type="text" placeholder="Enter FullName" required />
                        </div>
                        <div>
                            <label>Department</label>
                            <br></br>
                            <Input type="text" placeholder="Enter Departmemt" required />
                        </div>
                    </div>
                    <div className="input-flex">
                        <div>
                            <label>Matric Number</label>
                            <br></br>
                            <Input type="text" placeholder="Enter Matric Number" required />
                        </div>
                        <div>
                            <label>Candidates's Image</label>
                            <br></br>
                            <Input type="text" placeholder="Enter Image URL" required />
                        </div>
                    </div>
                    <div className="input-flex">
                        <div>
                            <label>Vote Count</label>
                            <br></br>
                            <Input type="number"disabled value={0} />
                        </div>
                        <div>
                            <label>Role</label>
                            <br></br>
                            <Select className="select" required>
                                <Option>President</Option>
                                <Option>Vice President</Option>
                                <Option>General Secretary</Option>
                            </Select>
                        </div>
                    </div>
                    <br></br>
                    <div>
                        <Button className="btn-sign" htmlType="submit">
                            REGISTER
                        </Button>
                    </div>
                </form>
                </div>
            </UserWebLayout>
        </div>
    )
}

export default AddCandidate
