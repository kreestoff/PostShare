import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import SignUp from './SignUp'
import NewPost from './NewPost'
import Profile from './Profile'
import {Navbar, Nav, Container} from 'react-bootstrap'


class NavBar extends Component {


    logout = () => {
        localStorage.clear()
        window.location.replace('/')
    }

    render() {
        return (
           
            <Router>
                <div>
                <Container>
                <Navbar fixed="top" bg="dark" variant="dark" className="justify-content-between">
                   
                        <Nav.Link href="/">Post-Share</Nav.Link>
                        {!localStorage.token ? <Nav.Link href="/login">Login</Nav.Link> : null}
                        {!localStorage.token ? <Nav.Link href="/signup">Sign Up</Nav.Link> : null}
                        {localStorage.token ? <Nav.Link href="/create-post">New Post</Nav.Link> : null} 
                        {localStorage.token ? <Nav.Link href="/profile">Profile</Nav.Link> : null}                   

                        {localStorage.token ? <button onClick={this.logout}>Logout</button> : null}
                </Navbar>
                </Container>
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