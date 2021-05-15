import { Component } from 'react';
import { Link } from 'react-router-dom';

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
        if (this.state.first && this.state.last && this.state.address && this.state.city && this.state.zip) {
            this.clearInputs();
            console.log('meow')
        } else {
            console.log('you\'re trash')
        }
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
                <Link to='/map'>
                    <button onClick={this.handleSubmit}>Login</button>
                </Link>
                <Link to='/newuser'>
                    <button>New User?</button>
                </Link>
                <Link to='/map'>
                    <button>Let's Eat!</button>
                </Link>
            </form>
        )
    }
}

export default Form;