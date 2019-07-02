import React, {Component} from 'react'
    
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
            <select>
            {
                this.state.categories.map(category => {
                 return <option key={category.id} value={category.id}>{category.name}</option>
                })
            } 
            </select>
        )
    }

}
 