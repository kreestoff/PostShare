import React, { Component } from 'react';



export default class NewPost extends Component {

    

    createComment = (e) => {
        e.preventDefault()
        let postForm = document.getElementById('postComment')
        let content = postForm[0].value
        let userId = this.props.userId
        let postId = this.props.postId
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
    }

    render() {
        return(
      
          <div>
                <form id="postComment" onSubmit={(e) => this.props.createComment(e)}>
                    <textarea className="commentTextArea" placeholder="Share your thoughts..."></textarea><br></br>
                    <button>Submit</button>
                </form>
          </div>
        )
    }

}