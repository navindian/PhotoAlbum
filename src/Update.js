import React, { Component } from 'react'
import axios from 'axios'


class Update extends Component {
    constructor(props) {
        super(props)

        this.state = {
            file: "",
            success: "",
            error:""
        }

    }

    handle = (event) => {
        console.log("datafile", event.target.files[0])
        this.setState({ file: event.target.files[0] })
        var reader = new FileReader();
       reader.readAsDataURL(event.target.files[0]);
    
    }
    upload = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', this.state.file)
        console.log("hi connect");

        axios.post("http://localhost:3001/upload", formData)
            .then(res => {
                console.log(res.data);
                this.setState({ success: res.data,error:"" })

            })
            .catch(err => {
                this.setState({ success:"", errore:err.message })
            })
    }
  
    render() {
        return (
            <React.Fragment>
                <div className="row">

                    <div className=" col-md-4 offset-3 ">
                        <form onSubmit={this.upload}>
                            <div className="form-group">
                                <label htmlFor="video">Update:</label>
                                <input type="file" accept="image/*|video/*"
                                    className="form-control" name="video" id="video" onChange={this.handle} />
                            </div>

                            <button className="btn btn-primary" type="submit">Upload</button>

                           
                        </form>

                        <span className="text-success">{this.state.success}</span>
                        
                        <span className="text-danger">{this.state.error}</span>
                    </div>
                </div>
            
            </React.Fragment>

        )
    }

}

export default Update
