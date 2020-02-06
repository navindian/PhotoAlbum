import React, { Component } from 'react'
import axios from "axios"
class register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formvalue: {
                username: "",
                password: "",
                emailid: ""
            },
            formerror: {
                username: "",
                password: "",
                emailid: ""
            },
            formvalidate: {
                username: false,
                password: false,
                emailid: false,
                button: false
            },
            successmessage: "",
            errormessage: ""
        }
    }

    onchange = (event) => {
        let name = event.target.name
        let value = event.target.value
        let form = this.state.formvalue
        form[name] = value
        console.log(event.target);

        this.setState({ formvalue: form })
        this.validation(event)
    }

    validation = (event) => {
        let value = event.target.value
        let formerror = this.state.formerror
        let formvalidate = this.state.formvalidate
        switch (event.target.name) {
            case "username":
                if (value == "") {
                    formerror.username = "Enter the Username"
                    formvalidate.username = false
                }
                else if (!value.match("^(?=.*[a-zA-Z0-9])(?=.{8,})")) {
                    formerror.username = "Username must contain at least 8 alphanumeric characters"
                    formvalidate.username = false
                }
                else {
                    formerror.username = ""
                    formvalidate.username = true
                }
                break;
            case "password":
                if (value == "") {
                    formerror.password = "Enter the Password"
                    formvalidate.password = false
                }
                else if (!value.match("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})")) {
                    formerror.password = "Passwords must contain at least six characters, including uppercase, lowercase letters ,numbers and special characters (!@#\$%\^&\*) "
                    formvalidate.password = false
                }
                else {
                    formerror.password = ""
                    formvalidate.password = true
                }

                break;
            case "emailid":
                if (value == "") {
                    formerror.emailid = "Enter the Emailid"
                    formvalidate.emailid = false
                }
                else if (!value.match("^([a-zA-Z0-9]{1,}([.]?[a-zA-Z0-9]+)*[@][a-zA-Z]{1,9}[.][a-zA-Z]{2,3})$")) {
                    formerror.emailid = "Please enter valid email-ID (username.user1@gamil.com)"
                    formvalidate.emailid = false
                }
                else {
                    formerror.emailid = ""
                    formvalidate.emailid = true
                }

                break;

        }
        formvalidate.button = formvalidate.username && formvalidate.password && formvalidate.emailid


    }
    onsubmit = (event) => {
        event.preventDefault();
        let formvalue = this.state.formvalue
        axios.post("http://localhost:3001/register", formvalue)
            .then(res => {
                console.log(res.data);
                
                this.setState({ successmessage: "Registration successfully", errormessage: "" })

            })
            .catch(err => {
                console.log(err.message);
                this.setState({ successmessage: "", errormessage:"Registration Failed" })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="row form-center" >
                    <div className="col-md-4 offset-4">
                        <h1 className="text-center">REGISTER</h1>

                        <form onSubmit={this.onsubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username"
                                    required placeholder="Enter the username" className="form-control" onChange={this.onchange} />
                                <span className="text-danger" > {this.state.formerror.username} </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="emailid">Email Id</label>
                                <input type="email" id="emailid" name="emailid"
                                    required placeholder="Enter the emailid" className="form-control" onChange={this.onchange} />
                                <span className="text-danger" > {this.state.formerror.emailid} </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password"
                                    required placeholder="Enter the password" className="form-control" onChange={this.onchange} />
                                <span className="text-danger" > {this.state.formerror.password} </span>
                            </div>

                            <button type="submit" className="btn btn-primary form-control"
                                disabled={!this.state.formvalidate.button}>Register </button>
                            <span className="text-success" > {this.state.successmessage} </span>
                            <span className="text-danger" > {this.state.errormessage} </span>
                        </form>

                    </div>

                </div>



            </React.Fragment>
        )
    }
}

export default register
