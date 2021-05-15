import { Component } from 'react';

class Form extends Component {
    constructor() {
        super()
        this.state = {
            first: '',
            last: '',
            address: '',
            city: '',
            zip: ''
        }
    }

    handleSubmit = e => {

    }

    handleChange = e => {
        
    }

    clearInputs = () => {

    }

    render() {
        return (
            <form>
                <input />
                <input />
                <input />
                <input />
                <input />
                <button>login</button>
                <button>New User?</button>
                <button></button>
            </form>
        )
    }
}

export default Form;