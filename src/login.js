import React, { Component } from 'react'
import "./App.css"
import axios from "axios"
import { Redirect } from 'react-router-dom'
class login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            formvalue: {
                username: "",
                password: ""
            },
            formerror: {
                username: "",
                password: ""
            },
            formvalidate: {
                username: false,
                password: false,
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
                    formerror.username = "Enter the username"
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
                    formerror.password = "Enter the username"
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

        }
        formvalidate.button = formvalidate.username && formvalidate.password


    }
    onsubmit = (event) => {

        event.preventDefault();
        let formvalue = this.state.formvalue
        axios.post("http://localhost:3001/login", formvalue)
            .then(res => {
                console.log(res.data.username);
                window.location.reload(false);
                sessionStorage.setItem("username",res.data.username);
            
                this.setState({ successmessage: "login Successfull", errormessage: "" })

            })
            .catch(err => {
                this.setState({ successmessage: "", errormessage:"check your username and password otherview create new account" })
            })


    }

    render() {
        if(sessionStorage.getItem("username")!=null) return <Redirect to="/"></Redirect>
        return (
            <React.Fragment>
                <div className="row form-center" >
                    <div className="col-md-4 offset-4">
                        <h1 className="text-center">LOGIN</h1>

                        <form onSubmit={this.onsubmit}>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <input type="text" id="username" name="username"
                                    required placeholder="Enter the username" className="form-control" onChange={this.onchange} />
                                <span className="text-danger" > {this.state.formerror.username} </span>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" name="password"
                                    required placeholder="Enter the password" className="form-control" onChange={this.onchange} />
                                <span className="text-danger" > {this.state.formerror.password} </span>
                            </div>

                            <button type="submit" className="btn btn-primary form-control"
                                
                                > Login </button>
                            <span className="text-success" > {this.state.successmessage} </span>
                            <span className="text-danger" > {this.state.errormessage} </span>
                        </form>

                    </div>

                </div>



            </React.Fragment>
        )
    }
}

export default login
