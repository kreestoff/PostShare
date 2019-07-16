import React, {Component} from 'react'
import {Form} from 'react-bootstrap'
    
export default class CategorySelector extends Component {
    constructor(){
        super()
        this.state = {
            categories: []
        }
    }

    componentDidMount(){
        fetch('http://localhost:3000/category')
        .then(res => res.json())
        .then(obj => {
            this.setState({
                categories: obj
            })
        })
    }

    render() {
        return(
         <Form.Control as="Select">
             <option value="">Select a Category</option>
         {   
             
             this.state.categories.map(category => {
              return <option key={category.id} value={category.id}>{category.name}</option>
             })
         } 
         </Form.Control>
        )
    }

}
 