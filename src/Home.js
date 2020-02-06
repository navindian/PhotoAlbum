import React, { Component } from 'react'
import axios from 'axios'
import {Carousel} from 'primereact/carousel';
import Album from "./album"
import { Redirect } from 'react-router-dom';
import login from './login';
class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            login:false,
            register:false
               
        }
    }
   
    render() {
        if (this.state.login) return <Redirect to={'/login'} ></Redirect>
        else if (this.state.register) return <Redirect to={'/register'} ></Redirect>
        return (
            <Album></Album>
        )
    }
}

export default Home
