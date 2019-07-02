import React, { Component } from 'react';



export default class PostPreview extends Component {
    

    render() {
        return(
            <div>
                {this.props.post.title}
            </div>
        )
    }

}