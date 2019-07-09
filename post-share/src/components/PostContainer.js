import React, { Component } from 'react';
import PostPreview from './PostPreview'
import CommentForm from './CommentForm'
import Comment from './Comment'
import Vote from './Vote'


export default class PostContainer extends Component {
    constructor(){
        super()
        this.state = {
            posts: []

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

    upVote = () => {
        fetch(`http://localhost:3000/vote/${this.props.post.id}/upvote`, {
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
            let countDiv = document.getElementById(`count${this.props.post.id}`)
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
    }

    downVote = () => {
        fetch(`http://localhost:3000/vote/${this.props.post.id}/downvote`, {
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
            let countDiv = document.getElementById(`count${this.props.post.id}`)
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
    }

    //open modal
    openPostView = (category, user, comments, post, votes) => {
        this.setState({category, user, comments, post, votes})
        console.log(votes)
    }

    //close modal
    closePostView = () => {
        this.setState({category: null, user: null, comments: null, post: null})
    }

    //close modal
    outsideClick = (e) => {
        if(e.target === document.getElementById('postView'))
        this.closePostView()
    }

    //creates top level comment on post
    createComment = (e) => {
        e.preventDefault()
        let postForm = document.getElementById('postComment')
        let content = postForm[0].value
        let postId = this.state.post.id
        let commentId = this.props.commentId || null
        fetch('http://localhost:3000/comment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.token}`
            },
            body: JSON.stringify({
              postId, commentId, content
            })
        })
        // window.location.reload()
    }


    getTree = (allComments, parentComment = null) => {
        let results = []
        if(!parentComment) {
            results = allComments.filter( comment => comment.commentId === null ).map( comment => { return {comment: comment, children: this.getTree(allComments,comment)}})
        } else {
            results = allComments.filter( comment => parentComment.id === comment.commentId ).map( comment => { return {comment: comment, children: this.getTree(allComments, comment)}} )
        }
        return results
    }

    render() {
        return(
            <div className="container">
                 {/* This is the modal that will be created to view the full photo/content 
                where the user can read comments or leave comments and vote if they are 
                logged in */}
                { !this.state.post || !this.state.category || !this.state.user || !this.state.comments ? null :
                <div onClick={(e) => this.outsideClick(e)}id="postView">
                    <div className="postContent">
                        <span id="closePostView" onClick={this.closePostView}>&times;</span>
                        <div className="postInfo">
                            <Vote postId={this.state.post.id} upVote={this.upVote} downVote={this.downVote} votes={this.state.votes}/>
                            <p>Category: {this.state.category.name} Posted by{this.state.user.username}
                            </p>

                        </div>
                        {
                        !this.state.post.image ? null :
                            <div className="contentContainer">
                                <img className="mediaContent" src={this.state.post.image} alt="sorry!"></img>
                            </div> 
                        }
                        <div className="postViewTitle">{this.state.post.title}</div>
                        <CommentForm postId={this.state.post.id} userId={this.state.user.id} createComment={this.createComment}/>
                        {/* Container for all comments */}
                        {
                        (!this.state.comments) ? null :
                        <div className="commentContainer">
                            {   
                                this.getTree(this.state.comments).map(tree => {
                                return <Comment comment={tree} currentUser={this.state.user.id}/>
                                })
                               
                                
                            }

                        </div>
                        }
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