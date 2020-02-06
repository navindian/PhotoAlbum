import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Update from './Update';
// import View from './View';
import Home from './Home';
import Login from "./login"
import Register from "./register"
import LOgout from "./logout"
import AlbumImage from "./albumImage"
import Album from "./album"
class App extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  render() {
    return (


      <React.Fragment>
        <Router>
          <nav className="navbar navbar-expand-md bg-dark navbar-dark">

            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" >Home</a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" href="/update" >Update</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/view" >View</a>
              </li> */}

            </ul>
            {sessionStorage.getItem("username")!=null ?
            
            <ul className="navbar-nav">
            <li className="nav-item">
            
             <a className="nav-link" href="/" > {sessionStorage.getItem("username")}</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/logout" >Logout</a>
            </li>
          </ul>
            
            
            :
            

            <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" href="/login" >Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/register" >Register</a>
            </li>
          </ul>
            
            }
           

          </nav>


          <Switch>
            <Route exact path="/" component={Home} />
            {/* <Route path="/update" component={Update} />
            <Route path="/view" component={View} /> */}
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/logout" component={LOgout} />
            <Route path="/album/:albumId" component={AlbumImage} />
            <Route path="/album" component={Album} />
          </Switch>
        </Router>
      </React.Fragment>


    )
  }
}

export default App
