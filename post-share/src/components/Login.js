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
            console.log(obj.token)
            localStorage.setItem('token', obj.token)
            fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    'user_id': 1,
                    'title': "heres a title",
                    'category': 1
                }
                )
            })
            if(obj.error){
                alert(obj.error)
            }
        })
    }
}


    render() {
        return(
            <div>
                <form onSubmit={this.login}>
                    <input type="text" name="username" placeholder="Username"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="submit" value="Login"/>
                </form>
            </div>
        )
    }

}