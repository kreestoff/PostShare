import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import NewPost from './NewPost'

class NavBar extends Component {


    logout = () => {
        localStorage.clear()
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/signup">Sign Up</Link>
                        </li>
                        <li>
                           <Link to="/create-post">New Post</Link>
                        </li>                      
                    </ul>
                    <button onClick={this.logout}>Logout</button>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/create-post" component={NewPost} />
                </div>
            </Router>
        )
    }
}

export default NavBar