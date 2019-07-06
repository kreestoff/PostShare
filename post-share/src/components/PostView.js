import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'



export default class PostView extends Component {
    constructor(){
        super()
        this.state = {
            category: []
        }
    }

    // componentDidMount(){
    //     fetch(`http://localhost:3000/post/${id}`)
    //     .then(res => res.json())
    //     .then(obj => {
    //         this.setState({
    //             category: obj
    //         })
    //     })
    // }

    render() {
        return(
            <div>
                  <h3>this is a post view {this.props.params}</h3>
            </div>
        )
    }

}