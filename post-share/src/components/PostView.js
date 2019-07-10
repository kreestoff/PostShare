import React, { Component } from 'react';
import CommentForm from './CommentForm'
import Comment from './Comment'
import PostVote from './PostVote'


export default class PostView extends Component {
    constructor(){
        super()
        this.state = {
            post: null

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
            if(obj.status === 'downvoted') {
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
        window.location.reload()
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
                <div onClick={(e) => this.props.outsideClick(e)}id="postView">
                    <div className="postContent">
                        <span id="closePostView" onClick={this.props.closePostView}>&times;</span>
                        <div className="postInfo">
                            <PostVote postId={this.state.post.id} upVote={this.upVote} downVote={this.downVote} votes={this.state.votes}/>
                            <p>Category: {this.state.category.name} Posted by {this.state.user.username}
                            </p>
                        </div><br></br>
                        {
                        !this.state.post.image ? null :
                            <div className="contentContainer">
                                <img className="mediaContent" src={this.state.post.image} alt="sorry!"></img>
                            </div> 
                        }
                        <div className="postViewTitle">{this.state.post.title}</div>
                        { !localStorage.token ? null :
                          <CommentForm postId={this.state.post.id} userId={this.state.user.id} createComment={this.createComment}/>
                        }
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
            </div>
        )
    }

}