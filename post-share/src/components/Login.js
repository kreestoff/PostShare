import React, { Component } from 'react';
import {Form, Container} from 'react-bootstrap'


export default class Login extends Component {

    login = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let password = e.target[1].value
        if (username !== "" && password !== "") {
            fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    username: username, password: password
            })
        })
        .then(res => res.json())
        .then(obj => {
            if(obj.error){
                alert(obj.error)
            } else {
                localStorage.setItem('token', obj.token)
                window.location.replace("/")
            }
        })
    }
}


    render() {
        return(
            <div className="loginForm">
                <Container style={{
                    "display": "block",
                    "margin": "auto"
                }}>
                    <div className="FormHeader">
                        <h2>Login Form</h2>
                    </div>
                    <Form onSubmit={this.login} style={{
                        "width": "75%", 
                        "borderStyle": "solid", 
                        "padding": "30px",
                        "margin": "auto",
                        "backgroundColor": "#f4f4f4",
                        "borderRadius": "25px"
                        }}> 
                        <Form.Group >
                            <Form.Label>Enter Your Username</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="username..." />
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Enter Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="password..." />
                        </Form.Group>
                        <input type="submit" value="Login"/>
                    </Form>
                </Container>

            </div>
        )
    }

}