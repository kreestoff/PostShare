import React, { Component } from 'react';
import CategorySelector from './CategorySelector'
import {Form, Container} from 'react-bootstrap'


export default class NewPost extends Component {

    

    createPost = (e) => {
        e.preventDefault()
        let postForm = document.getElementById('postForm')
        if(e.target[1].value === ""){
            alert('Your post MUST include a title')
        } else if(e.target[3].value === ""){
            alert('You must select a category')
        } else {
            let image = e.target[0].value
            let title = e.target[1].value
            let description = e.target[2].value
            let category = e.target[3].value
            fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    image, title, description, category
                })
            })
            .then(res => res.json())
            .then(obj => {
                window.location.replace('/')
            })
        }
    }

    render() {
        return(
            <div className="newPostForm">
                <Container style={{
                    "display": "block",
                    "margin": "auto"
                }}>
                <div className="FormHeader">
                    <h2>Submit a New Post</h2>
                </div>
                <Form id="postForm" onSubmit={this.createPost} style={{
                    "width": "75%", 
                    "borderStyle": "solid", 
                    "padding": "30px",
                    "margin": "auto",
                    "backgroundColor": "#f4f4f4",
                    "borderRadius": "25px"
                    }}>
                    <Form.Group >
                        <Form.Label>Paste a url for an Image or GIF</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="url..." />
                        <Form.Text className="text-muted">Optional</Form.Text>
                    </Form.Group >
                    <Form.Group >
                        <Form.Label>Give your post a title</Form.Label>
                        <Form.Control size="lg" type="text" placeholder="an interesting title..." />
                        <Form.Text className="text-muted">Required</Form.Text>
                    </Form.Group >
                    <Form.Group >
                        <Form.Label>Enter a description</Form.Label>
                        <Form.Control size="lg" as="textarea" rows="3" placeholder="extra info..." />
                        <Form.Text className="text-muted">Optional</Form.Text>
                    </Form.Group >
                    <CategorySelector /><br></br>
                    <input type="submit" value="Create Post"/>
                </Form>
                </Container>
            </div>
        )
    }
    
}
