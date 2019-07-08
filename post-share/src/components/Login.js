import React, { Component } from 'react';


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
            <div className="form">
                <form onSubmit={this.login}>
                    <input type="text" name="username" placeholder="Username"/><br></br>
                    <input type="password" name="password" placeholder="Password"/><br></br>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }

}