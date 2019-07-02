import React, { Component } from 'react';
import PostPreview from './PostPreview'


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

    render() {
        return(
            <div>
                {
                    this.state.posts.map(post => {
                       return <PostPreview key={post.id} post={post}/>
                    })
                }
            </div>
        )
    }

}