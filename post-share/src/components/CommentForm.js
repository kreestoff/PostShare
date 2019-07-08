import React, { Component } from 'react';



export default class CommentForm extends Component {

  

    render() {
        return(
      
          <div>
            {
              !this.props.commentId ?
                <form id="postComment" onSubmit={(e) => this.props.createComment(e)}>
                    <textarea className="commentTextArea" placeholder="Share your thoughts..."></textarea><br></br>
                    <button>Submit</button>
                </form> 
                :
                <form id={`postComment${this.props.commentId}`} onSubmit={(e) => this.props.createComment(e)}>
                    <textarea className="commentTextArea" placeholder="Share your thoughts..."></textarea><br></br>
                    <button>Submit</button>
                </form> 

            }
          </div>
        )
    }

}


// {`postComment${this.props.commentId}`}