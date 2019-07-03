import React, { Component } from 'react';



export default class PostPreview extends Component {
    constructor(){
        super()
        this.state = {
            category: []
        }
    }

    componentDidMount(){
        fetch(`http://localhost:3000/category/${this.props.post.categoryId}`)
        .then(res => res.json())
        .then(obj => {
            this.setState({
                category: obj
            })
        })
    }

    render() {
        return(
            <div>
                <div>{this.state.category.name}</div>
                <div>
                    {
                     this.props.post.image ? <img src={this.props.post.image} alt="null" style={{width: "100px"}}/> : null
                    }
                    {
                     
                    }
                </div>
                <p>{this.props.post.title}</p>
            </div>
        )
    }

}