import React, { Component } from 'react';
import PostVote from './PostVote'
import { Card, Image } from 'react-bootstrap'



export default class PostPreview extends Component {
    constructor(){
        super()
        this.state = {
            loaded: false
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/post/${this.props.post.id}`)
        .then(res => res.json())
        .then(obj => {
            this.setState({
                category: {...obj.postCategory},
                user: {...obj.postUser},
                comments: obj.postComments,
                post: {...obj.currentPost},
                votes: obj.voteTotal
            }, () => this.setState({loaded:true}) )
        })
    }

    upVote = () => {
        if(localStorage.token) {
            fetch(`http://localhost:3000/post/${this.props.post.id}/upvote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    user_id: this.state.user.id
                })
            })
            .then(res => res.json())
            .then(obj => {
                let countDiv = document.getElementById(`postCount${this.props.post.id}`)
                let count = parseInt(countDiv.innerText)
                if(obj.status === 'upvoted') {
                    let newTotal = count + 1
                    countDiv.innerText = newTotal
                } else if(obj.status === 'downvote to upvote') {
                    let newTotal = count + 2
                    countDiv.innerText = newTotal
                }
                console.log(obj)
            })
        } else {alert("Login or Sign up to vote")}
    }

    downVote = () => {
        if(localStorage.token) {
            fetch(`http://localhost:3000/post/${this.props.post.id}/downvote`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    user_id: this.state.user.id
                })
            })
            .then(res => res.json())
            .then(obj => {
                let countDiv = document.getElementById(`postCount${this.props.post.id}`)
                let count = parseInt(countDiv.innerText)
                if(obj.status === 'upvoted') {
                    let newTotal = count - 1
                    countDiv.innerText = newTotal
                } else if(obj.status === 'upvote to downvote') {
                    let newTotal = count - 2
                    countDiv.innerText = newTotal
                }
                console.log(obj)
            })
        } else {alert("Login or Sign up to vote")}
    }
    
    render() {
        return(
            (!this.state.loaded) ? null :
            <div className="postPreview" >
                <div className="previewVote"><PostVote postId={this.state.post.id} upVote={this.upVote} downVote={this.downVote} votes={this.state.votes}/></div>
                <div className="infoPreview" onClick={() => this.props.openPostView(this.state.post)} >
                    <div className="mediaPreview">
                        {
                            this.props.post.image ? <Image src={this.props.post.image} alt="null"  style={{"max-width": "100px", "max-height": "100px"}}/> : null
                        }
                    </div>
                    <div>Category: {this.state.category.name}</div>
                    <p>{this.state.post.title}</p>
                </div>
            </div>
        )
    }

}