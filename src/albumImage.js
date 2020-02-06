import React, { Component } from 'react'
import Modal from "react-bootstrap/Modal"

import axios from 'axios'
class albumImage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            display: false,
            albumImage:[],
            albumId:"",
            imageId:""

        }
    }
    componentWillMount() {
        console.log(this.props.match.params.albumId);
        
        axios.get("http://jsonplaceholder.typicode.com/photos")
            .then(res => {
                console.log(res.data)
                this.setState({ albumImage: res.data,albumId:this.props.match.params.albumId })
            })
    }

    handleOpen = (e) => {
        console.log(e.target.id);
        this.setState({ display: true ,imageId: e.target.id})
    }
    handleClose=()=>{
        this.setState({ display: false })
    }

   
    render() {

        return (
            <React.Fragment>

                <div className="grid">

                    {this.state.albumImage.map(albumImage =>
                       albumImage.albumId==this.state.albumId ?
                       ( <img src={albumImage.thumbnailUrl} onClick={this.handleOpen}  id={albumImage.id} />)
                       :null
                       
                    )}
                </div>

                <Modal show={this.state.display} onHide={this.handleClose}  className="modalchange" size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered >
                    <Modal.Header closeButton>
                        
                    </Modal.Header>
                    <Modal.Body>

                    {this.state.albumImage.map(albumImage =>
                       albumImage.id==this.state.imageId ?
                       ( <img src={albumImage.url} onClick={this.handleOpen}  id={albumImage.id} />)
                       :null
                       
                    )}
                    </Modal.Body>
                   
                </Modal>

            </React.Fragment>

        )
    }
}

export default albumImage
