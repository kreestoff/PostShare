import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostPreview from './PostPreview'


export default class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: [],
            user_posts: []
        }
    }


    componentDidMount(){
        fetch('http://localhost:3000/user/current', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(obj => {
            this.setState({
                user: obj.user,
                user_posts: obj.posts
            })
        })
    }

    render() {
        return(
            <div>
                <h3>Hello {this.state.user.username}!</h3>
                <Router>
                    <div>
                        <ul>
                            {this.state.user_posts.map(post => {
                                return <PostPreview key={post.id} post={post}/>
                            })}
                        </ul>
                    </div>


                </Router>
            </div>
        )
    }

}