import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import NewPost from './NewPost'
import Profile from './Profile'

class NavBar extends Component {


    logout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    render() {
        return (
            <Router>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                       </li>
                        {!localStorage.token ? <li><Link to="/login">Login</Link></li> : null}
                        {!localStorage.token ? <li><Link to="/signup">Sign Up</Link></li> : null}
                        {localStorage.token ? <li><Link to="/create-post">New Post</Link></li> : null} 
                        {localStorage.token ? <li><Link to="/profile">Profile</Link></li>  : null}                   
                    </ul>
                    <button onClick={this.logout}>Logout</button>
                <Route exact path="/" component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={SignUp} />
                <Route path="/create-post" component={NewPost} />
                <Route path="/profile" component={Profile} />
                </div>
            </Router>
        )
    }
}

export default NavBar