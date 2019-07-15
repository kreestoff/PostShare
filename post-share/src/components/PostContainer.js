import React, { Component } from 'react';
import PostPreview from './PostPreview';
import PostView from './PostView';
import CategorySelector from './CategorySelector'
import { Form } from 'react-bootstrap'


export default class PostContainer extends Component {
    constructor(){
        super()
        this.state = {
            originalPosts: [],
            posts: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/post')
        .then(res => res.json())
        .then(obj => {
            let sorted = obj.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
            this.setState({
                originalPosts: sorted,
                posts: sorted
            })
        })
    }

    upVote = () => {
        fetch(`http://localhost:3000/vote/${this.props.post.id}/upvote`, {
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
    }

    downVote = () => {
        fetch(`http://localhost:3000/vote/${this.props.post.id}/downvote`, {
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
                let newTotal = count - 1
                countDiv.innerText = newTotal
            } else if(obj.status === 'upvote to downvote') {
                let newTotal = count - 2
                countDiv.innerText = newTotal
            }
            console.log(obj)
        })
    }

    //open modal
    openPostView = (post) => {
        this.setState({post})
        console.log(post)
    }

    //close modal
    closePostView = () => {
        this.setState({post: null})
        window.location.reload()
    }

    //close modal
    outsideClick = (e) => {
        if(e.target === document.getElementById('postView'))
        this.closePostView()
    }

    filterPosts = (e) => {
        let category = e.target.value
        if(category == "") {
            console.log("empty string")
            this.setState({
                posts: this.state.originalPosts
            })
        } else {
            let filteredPosts = this.state.originalPosts.filter(post => post.categoryId == category)
            this.setState({
                posts: filteredPosts
            })
        }
    }

    sortBy = (e) => {

    }

    render() {
        return(
            <div className="postContainer">
                <div className="post-container-header">
                    <Form onChange={(e) => this.filterPosts(e)} style={{
                        "width": "30%",
                        "align-text": "center",
                        "margin": "auto"
                    }}>
                    <CategorySelector />
                    </Form>
                    {/* <Form>
                        <Form.Control as="Select">
                            <option value="new">Sort by New</option>
                            <option value="old">Sort by Old</option>
                            <option value="highestvotes">Sort by Highest Voted</option>
                            <option value="lowestvotes">Sort by Highest Voted</option>
                        </Form.Control>
                    </Form> */}
                </div>
                {
                    !this.state.post ? null :
                    <PostView post={this.state.post} outsideClick={this.outsideClick} closePostView={this.closePostView}/>
                }
                <div>
                {   this.state.post ? null :
                    this.state.posts.map(post => {
                       return <PostPreview key={post.id} post={post} openPostView={this.openPostView}/>
                    })
                }
                </div>
            </div>
        )
    }

}