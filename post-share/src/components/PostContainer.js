import React, { Component } from 'react';
import PostPreview from './PostPreview'
import CommentForm from './CommentForm'
import Comment from './Comment'


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

    //open modal
    openPostView = (category, user, comments, post) => {
        this.setState({category, user, comments, post})
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
        // window.location.reload()
    }

    //check if a comment is top level
    topLevelComment = (comment) => {
        if(comment.commentId === null) {
            return true
        } else {return false}
    }

    //check for child comments
    filterChildren = (comment1, allComments) => {
        let childComments = allComments.filter(comment2 => comment2.commentId === comment1.id)
        if(childComments.length > 0) {
            return childComments
        } else {return null}
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
                { !this.state.post ? null :
                <div onClick={(e) => this.outsideClick(e)}id="postView">
                    <div className="postContent">
                        <span id="closePostView" onClick={this.closePostView}>&times;</span>
                        <div className="postInfo">Category: {this.state.category.name} Posted by {this.state.user.username}</div>
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