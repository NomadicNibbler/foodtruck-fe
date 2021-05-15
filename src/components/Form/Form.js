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
        e.preventDefault();
        this.clearInputs();
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    clearInputs = () => {
        this.setState({ first: '', last: '', address: '', city: '', zip: ''})
    }

    render() {
        return (
            <form>
                <input />
                <input />
                <input />
                <input />
                <input />
                <button>Login</button>
                <button>New User?</button>
                <button>Let's Eat!</button>
            </form>
        )
    }
}

export default Form;