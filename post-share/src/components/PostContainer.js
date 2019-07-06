import React, { Component } from 'react';
import PostPreview from './PostPreview'
import CommentForm from './CommentForm'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


export default class PostContainer extends Component {
    constructor(){
        super()
        this.state = {
            posts: [],
            category: null,
            user: null,
            comments: null,
            post: null,
            comment: null
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/post')
        .then(res => res.json())
        .then(obj => {
            this.setState({
                posts: obj
            })
        })
    }

    openPostView = (category, user, comments, post) => {
        this.setState({category, user, comments, post})
    }

    closePostView = () => {
        this.setState({category: null, user: null, comments: null, post: null})
    }

    outsideClick = (e) => {
        if(e.target == document.getElementById('postView'))
        this.closePostView()
    }

    createComment = (e) => {
        e.preventDefault()
        let postForm = document.getElementById('postComment')
        let content = postForm[0].value
        let userId = this.state.user.id
        let postId = this.state.post.id
        let commentId = this.props.commentId || null
        fetch('http://localhost:3000/comment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId, postId, commentId, content
            })
        })
        this.closePostView()
    }

    render() {
        return(
            <div className="container">
                 {/* This is the modal that will be created to view the full photo/content 
                where the user can read comments or leave comments and vote if they are 
                logged in */}
                { !this.state.post ? null :
                <div onClick={(e) => this.outsideClick(e)}id="postView">
                    <div className="postContent">
                        <span id="closePostView" onClick={this.closePostView}>&times;</span>
                        <div className="postInfo">Category: {this.state.category.name} Posted by {this.state.user.username}</div>
                        {
                        !this.state.post.image ? null :
                            <div className="contentContainer">
                                <img src={this.state.post.image}></img>
                            </div> 
                        }
                        <div className="postViewTitle">{this.state.post.title}</div>
                        <CommentForm postId={this.state.post.id} userId={this.state.user.id} createComment={this.createComment}/>
                        {/* Container for all comments */}
                        <div className="commentContainer">

                        </div>
                    </div>
                </div>
                }
                <div>
                {
                    this.state.posts.map(post => {
                       return <PostPreview key={post.id} post={post} openPostView={this.openPostView}/>
                    })
                }
                </div>
            </div>
        )
    }

}