import React, { Component } from 'react';
import CategorySelector from './CategorySelector'


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
                postForm.reset()
            })
        }
    }

    render() {
        return(
            <div>
                <form id="postForm"onSubmit={this.createPost}>
                    <h5>Paste an Image of GIF url</h5>
                    <input type="text" name="image" placeholder="Image url" /><br></br>
                    <input type="text" name="title" placeholder="Title Required"/><br></br>
                    <textarea rows="5" cols="80" placeholder="Enter optional description..."></textarea><br></br>
                    <h5>Choose a Category</h5>
                    <CategorySelector /><br></br>
                    <input type="submit" value="Create Post"/>
                </form>
            </div>
        )
    }

}