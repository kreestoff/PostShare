import React, { Component } from 'react';
import CommentForm from './CommentForm'



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
          user: {...obj},
          loaded: true
        })
      })
    }


  
    //open the comment form to comment on a comment
    respondToComment = (e) => {
      if(e.target !== document.getElementById(e.target.id)) {
        let newClicked = !this.state.clicked
        this.setState({clicked: newClicked})
      }
    }

    //post the comment to a comment
    createComment = (e) => {
      e.preventDefault()
      let content = e.target[0].value
      let userId = parseInt(this.props.currentUser)
      let postId = this.props.comment.comment.postId
      let commentId = this.props.comment.comment.id
      fetch('http://localhost:3000/comment', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userId, postId, commentId, content
            })
        })
    }

    render() {
        return(
          <div className="comment" >
            {!this.state.loaded ? null :
            <>
              <div>{this.state.user.username}</div>
              <div >{this.props.comment.comment.content}</div>
              <button onClick={(e) => this.respondToComment(e)}>reply</button>
            {this.state.clicked ? <CommentForm createComment={this.createComment} commentId={this.props.comment.id}/> : null}
            { !this.props.comment.children ? null :
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