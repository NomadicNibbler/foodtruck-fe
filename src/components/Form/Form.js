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
                <input
                    name='first'
                    placeholder='First Name'
                    type='text'
                    value={this.state.first}
                    onChange={this.handleChange}
                 />
                <input 
                    name='last'
                    placeholder='Last Name'
                    type='text'
                    value={this.state.last}
                    onChange={this.handleChange}

                />
                <input
                    name='address'
                    placeholder='Address'
                    type='text'
                    value={this.state.address}
                    onChange={this.handleChange}
                 />
                <input 
                    name='city'
                    placeholder='City'
                    type='text'
                    value={this.state.city}
                    onChange={this.handleChange}
                />
                <input 
                    name='zip'
                    placeholder='Zip Code'
                    type='text'
                    value={this.state.zip}
                    onChange={this.handleChange}
                />
                <button>Login</button>
                <button>New User?</button>
                <button>Let's Eat!</button>
            </form>
        )
    }
}

export default Form;