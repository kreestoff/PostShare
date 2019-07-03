import React, { Component } from 'react';
import CategorySelector from './CategorySelector'


export default class NewPost extends Component {

    

    createPost = (e) => {
        e.preventDefault()
        let postForm = document.getElementById('postForm')
        if(e.target[0].value && e.target[1].value){
            alert('Post can only have a video OR an image. Please clear one field.')
        }
        else if(e.target[2].value === ""){
            alert('Your post MUST include a title')
        } else {
            let video = e.target[0].value
            let image = e.target[1].value
            let title = e.target[2].value
            let description = e.target[3].value
            let category = e.target[4].value
            fetch('http://localhost:3000/post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.token}`
                },
                body: JSON.stringify({
                    video, image, title, description, category
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
                    <h5>Paste a Video url</h5>
                    <input type="text" name="video" placeholder="Video url"/><br></br>
                    <h5>Or...</h5><br></br>
                    <h5>Paste an Image url</h5>
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