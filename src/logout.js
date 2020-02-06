import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
class logout extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }
    //WARNING! To be deprecated in React v17. Use componentDidMount instead.
    componentWillMount() {
        sessionStorage.clear();
         
    }

    render() {
        if(sessionStorage.getItem("username")==null) return <Redirect to="/"></Redirect>
        return (
            <div>
                
            </div>
        )
    }
}

export default logout
