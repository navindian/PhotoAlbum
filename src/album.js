import React, { Component } from 'react'

import axios from 'axios'
import { IoMdAlbums } from 'react-icons/io';
import { IconContext } from "react-icons";

import { Redirect } from 'react-router-dom';
class album extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: [],
            image: false,
            titlename: "",
            albumId: ""
        }
    }
    componentWillMount() {
        axios.get("https://jsonplaceholder.typicode.com/albums")
            .then(res => {
                this.setState({ title: res.data })
            })
    }

    handleChange = (e) => {
        console.log(e.target.id);
        this.setState({image:true,albumId:e.target.id})





    }

    render() {
        if (this.state.image) return (<Redirect to={"/album/" + this.state.albumId}></Redirect>)
        return (
            <React.Fragment>

                <div className="grid">

                    {this.state.title.map(titledata =>

                        titledata.userId == "1" ? (
                            
                                <div className="card album" key={titledata.id}>

                                    <IconContext.Provider value={{ className: 'IoMdAlbums' }} >
                                        <div>
                                            <IoMdAlbums />
                                        </div>

                                    </IconContext.Provider>
                                    <div className="title"  onClick={this.handleChange} id={titledata.id}>
                                    {titledata.title.charAt(0).toUpperCase() + titledata.title.slice(1)}
                                        </div>
                                    

                                </div>


                           
                        ) : null




                    )}
                </div>


            </React.Fragment>

        )
    }
}

export default album
