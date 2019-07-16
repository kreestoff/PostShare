import React, { Component } from 'react';
import { Form } from 'react-bootstrap';



export default class CommentForm extends Component {

  

    render() {
        return(
      
          <div>
            {
              !this.props.commentId ?
                <Form id="postComment" onSubmit={(e) => this.props.createComment(e)}>
                    <Form.Control as="textarea" className="commentTextArea" placeholder="Share your thoughts..." />
                    <button>Submit</button>
                </Form> 
                :
                <Form id="commentComment" onSubmit={(e) => this.props.createComment(e)}>
                    <Form.Control as="textarea" className="autoExpand" className="commentTextArea" placeholder="Share your thoughts..." /><br></br>
                    <button>Submit</button>
                </Form> 

            }
          </div>
        )
    }

}


// {`postComment${this.props.commentId}`}