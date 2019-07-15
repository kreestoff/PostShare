import React, { Component } from 'react';
import {Form, Container} from 'react-bootstrap'



export default class SignUp extends Component {

    signUp = (e) => {
        e.preventDefault()
        let username = e.target[0].value
        let email = e.target[1].value
        let password1 = e.target[2].value
        let password2 = e.target[3].value
        if(password1 !== password2){
            alert("Passwords to not match please try again.")
            e.target[2].value = ""
            e.target[3].value = ""
        } else {
            if (username !== "" && password1 !== "") {
                fetch('http://localhost:3000/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        username, email, password: password1
                })
            })
            .then(res => res.json())
            .then(obj => {
                if(obj.error){
                    alert(obj.error)
                } else {
                    console.log(obj)
                    alert('Account created. Please login to post, vote, and comment.')
                    window.location.replace('/login')
                }
            })
            .catch(err => {
                alert(err)
            })
        }
    }
}


    render() {
        return(
            <div className="signupForm">
                <Container style={{
                    "display": "block",
                    "margin": "auto"
                }}>
                    <div className="FormHeader">
                        <h2>SignUp Form</h2>
                    </div>
                    <Form onSubmit={this.signUp}style={{
                        "width": "75%", 
                        "borderStyle": "solid", 
                        "padding": "30px",
                        "margin": "auto",
                        "backgroundColor": "#f4f4f4",
                        "borderRadius": "25px"
                        }}>
                        <Form.Group>
                            <Form.Label>Enter a Username</Form.Label>
                            <Form.Control size="lg" type="text" placeholder="username..." />
                            <Form.Text className="text-muted">This will be your displayed name</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter an Email</Form.Label>
                            <Form.Control size="lg" type="email" placeholder="email..." />
                            <Form.Text className="text-muted">Your email will never be shared</Form.Text>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Enter a Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="password..." />
                            <Form.Label>Re-type your Password</Form.Label>
                            <Form.Control size="lg" type="password" placeholder="re-type password..." />
                        </Form.Group>
                        <input type="submit" value="Sign Up" />
                    </Form>
                </Container>
            </div>
        )
    }

}