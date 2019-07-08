import React, { Component } from 'react';



export default class PostPreview extends Component {
    constructor(){
        super()
        this.state = {
            loaded: false
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
                post: {...obj.currentPost}
            }, () => this.setState({loaded:true}) )
        })
    }

    
    render() {
        return(
            (!this.state.loaded) ? null :
            <div className="postPreview" onClick={() => this.props.openPostView(this.state.category, this.state.user, this.state.comments, this.state.post)}>
                <div className="mediaPreview">
                    {
                        this.props.post.image ? <img src={this.props.post.image} alt="null" style={{width: "100px"}}/> : null
                    }
                    {
                        this.props.post.video ? <img src="https://image.flaticon.com/icons/svg/25/25470.svg" alt="null" style={{width: "100px"}}/> : null
                    }
                </div>
                <div>Category: {this.state.category.name}</div>
                <p>{this.state.post.title}</p>
            </div>
        )
    }

}