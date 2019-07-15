import React, { Component } from 'react';
import PostPreview from './PostPreview';
import PostView from './PostView';
import CategorySelector from './CategorySelector'
import { Form } from 'react-bootstrap'


export default class Profile extends Component {
    constructor(){
        super()
        this.state = {
            user: null,
            user_posts: null,
            loaded: false
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/user/current', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.token}`
            }
        })
        .then(res => res.json())
        .then(obj => {
            let sorted = obj.userPosts.sort((a, b) => (a.createdAt < b.createdAt) ? 1 : -1)
            this.setState({
                user: {...obj.user},
                originalPosts: sorted,
                user_posts: sorted,
                loaded: true
            })
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
                user_posts: this.state.originalPosts
            })
        } else {
            console.log("sorting by something")
            let filteredPosts = this.state.originalPosts.filter(post => post.categoryId == category)
            console.log(filteredPosts)
            this.setState({
                user_posts: filteredPosts
            })
        }
    }

    render() {
        return(
            <div className="profileContainer">
                {
                    !this.state.post ? null : <PostView post={this.state.post} outsideClick={this.outsideClick} closePostView={this.closePostView} />
                }
                {
                !this.state.loaded && !this.state.post ? null :
                <>
                <div className="profileHeader">
                    <h3>Hello {this.state.user.username}!</h3> <br></br>
                    <h3>Check how your Posts are doing</h3><br></br>
                    <Form onChange={(e) => this.filterPosts(e)} style={{
                        "width": "30%",
                        "align-text": "center",
                        "margin": "auto"
                    }}>
                    <CategorySelector />
                    </Form>
                </div>
                    <div>
                        <ul>
                            {this.state.user_posts.map(post => {
                                return <PostPreview key={post.id} post={post} openPostView={this.openPostView}/>
                            })}
                        </ul>
                    </div>
                </>
                }
            
            </div>
        )
    }

}