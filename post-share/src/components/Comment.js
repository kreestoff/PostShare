import React, { Component } from 'react';
import CommentForm from './CommentForm'
import CommentVote from './CommentVote'


export default class Comment extends Component {
    constructor(){
      super()
      this.state = {  
        user: null,
        clicked: false,
        showComments: true,
        loaded: false,
        post: null
        }
    }

    // get the user who posted the comment
    componentDidMount(){
      fetch(`http://localhost:3000/comment/${this.props.comment.comment.id}/user`)
      .then(res => res.json())
      .then(obj => {
        this.setState({
          user: {...obj.commentUser},
          votes: obj.voteTotal,
          loaded: true
        })
      })
    }


  
    //open the comment form to comment on a comment
    respondToComment = (e) => {
      if(!localStorage.token){
        alert("Create an account or log in to comment")
      } else {
        if(e.target !== document.getElementById(e.target.id)) {
          let newClicked = !this.state.clicked
          this.setState({clicked: newClicked})
        }
      }
    }

    //post the comment to a comment
    createComment = (e) => {
      e.preventDefault()
      let content = e.target[0].value
      let postId = this.props.comment.comment.postId
      let commentId = this.props.comment.comment.id
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

  upVote = () => {
    if(localStorage.token) {
      fetch(`http://localhost:3000/comment/${this.props.comment.comment.id}/upvote`, {
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
          console.log(obj)
          let countDiv = document.getElementById(`commentCount${this.props.comment.comment.id}`)
          let count = parseInt(countDiv.innerText)
          if(obj.status === 'upvoted') {
              let newTotal = count + 1
              countDiv.innerText = newTotal
          } else if(obj.status === 'downvote to upvote') {
              let newTotal = count + 2
              countDiv.innerText = newTotal
            }
      })
    } else {alert("Login or Sign up to vote")}
}

  downVote = () => {
    if(localStorage.token) {
      fetch(`http://localhost:3000/comment/${this.props.comment.comment.id}/downvote`, {
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
          console.log(obj)
          let countDiv = document.getElementById(`commentCount${this.props.comment.comment.id}`)
          let count = parseInt(countDiv.innerText)
          if(obj.status === 'downvoted') {
              let newTotal = count + 1
              countDiv.innerText = newTotal
          } else if(obj.status === 'upvote to downvote') {
              let newTotal = count - 2
              countDiv.innerText = newTotal
            }
      })
    } else {alert("Login or Sign up to vote")}
}

hideConversation = () => {
  let newShow = !this.state.showComments
  this.setState({
    showComments: newShow
  })
}
  

    render() {
        return(
          <div className="comment" >
            <CommentVote upVote={this.upVote} downVote={this.downVote} commentId={this.props.comment.comment.id} votes={this.state.votes}/>
            {!this.state.loaded ? null :
            <>
              <div>{this.state.user.username}</div>
              <div >{this.props.comment.comment.content}</div>
              <button onClick={(e) => this.respondToComment(e)}>reply</button>
              {(this.props.comment.children) ? <button onClick={this.hideConversation}>Hide/Show Conversation</button> : null }
            {this.state.clicked ? <CommentForm createComment={this.createComment} commentId={this.props.comment.comment.id}/> : null}
            { 
              (this.props.comment.children && !this.state.showComments) ? null :
              this.props.comment.children.map(comment => {
                return <Comment key={comment.id} comment={comment} currentUser={this.props.currentUser} />
              })

            }
            </>
            }
          </div>
        )
    }

}