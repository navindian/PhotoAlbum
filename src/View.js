import React, { Component } from 'react'
import axios from 'axios'
// import {ProgressSpinner} from 'primereact/progressspinner';
class View extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file_array: [],
            temp: false
        }
    }
    componentDidMount() {
        axios.get("http://localhost:3001/view")
            .then(res => {
                console.log(res.data);

                this.setState({ file_array: res.data, temp: true })
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className="row">
                <div className="col-md-6 offset-3" >
                    {this.state.temp > 0 ? this.state.file_array.map(element =>
                        <div key={element.file.name}>

                            <h1> {element.file.name}</h1>
                            <h2> Size:{element.file.size} bytes</h2>
                            {/* <img src={require(`../public/upload/${element.file.name}`)} style={{width:'100%',height:'100%' }} alt= {element.file.name} /> */}
                            <video className="video-container video-container-overlay" autoPlay="true" loop  style={{width:'100%',height:'100%' }}>
                                <source src={require(`../public/upload/${element.file.name}`)} type="video/mp4" />
                            </video>

                        </div>



                    ) : null}
                    {/* {this.file_array[0].file.name} */}

                </div>


            </div>
        )
    }
}

export default View
