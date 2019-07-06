import React, { Component } from 'react';


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
        }
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
                alert('account creation successful, please login')
                window.location.replace('/login')
            }
        })
        .catch(err => {
            alert(err)
        })
    }
}


    render() {
        return(
            <div className="form">
                <form onSubmit={this.signUp}>
                    <input type="text" name="username" placeholder="Username"/><br></br>
                    <input type="text" name="email" placeholder="Email" /><br></br>
                    <input type="password" name="password" placeholder="Password"/><br></br>
                    <input type="password" name="password" placeholder="Confirm Password"/><br></br>
                    <input type="submit" value="Create Account"/><br></br>
                </form>
            </div>
        )
    }

}