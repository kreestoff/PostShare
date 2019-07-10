import React, { Component } from 'react';
import PostVote from './PostVote'



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
                <div onClick={() => this.props.openPostView(this.state.post)} className="mediaPreview">
                    {
                        this.props.post.image ? <img src={this.props.post.image} alt="null" style={{width: "100px"}}/> : null
                    }
                    {
                        this.props.post.video ? <img src="https://image.flaticon.com/icons/svg/25/25470.svg" alt="null" style={{width: "100px"}}/> : null
                    }
                </div>
                <div>Category: {this.state.category.name}</div>
                <p onClick={() => this.props.openPostView(this.state.post)}>{this.state.post.title}</p>
            </div>
        )
    }

}