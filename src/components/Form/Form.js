import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
const Form = ({ createNewUser, loginUser, error}) => {

    const location = useLocation().pathname
    const [userName, setUserName] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
   
    const handleSubmit = e => {
        if (location === '/newuser' && first && last && address && city && zip.length === 5 && !error.length) {
            createNewUser(userName, first, last, address, city, zip)
            clearInputs()
        } else if (location === '/login' && userName && !error) {
            loginUser(userName)
            clearInputs()
        } else if (location === '/newlocation' && address && city && zip.length === 5 && !error.length) {
            clearInputs()
        } else {
            e.preventDefault()
        }
    }

    const clearInputs = () => {
        setUserName('')
        setFirst('')
        setLast('')
        setAddress('')
        setCity('')
        setZip('')
    }

    return (
        <form>
            {location === '/newuser' &&
            <h2 className='form-prompt' data-cy='newuser-prompt'>Please enter your user information</h2>}
            {location === '/login' &&
                <h2 className='form-prompt' data-cy='login-prompt'>Please enter your username</h2>}
            {location === '/newlocation' &&
            <h2 className='form-prompt' data-cy='location-prompt'>Please enter your desired location</h2>}

            {(location === '/login' || location === '/newuser') &&
                <input
                    data-cy='username-input'
                    name='username'
                    placeholder='User Name'
                    type='text'
                    value={userName}
                    onChange={ e => setUserName(e.target.value) }
                />
            }


            {location === '/newuser' &&
                <input
                    data-cy='first-name-input'
                    name='first'
                    placeholder='First Name'
                    type='text'
                    value={first}
                    onChange={ e => setFirst(e.target.value) }
                />
            }

            {location === '/newuser' &&
                <input 
                    data-cy='last-name-input'
                    name='last'
                    placeholder='Last Name'
                    type='text'
                    value={last}
                    onChange={ e => setLast(e.target.value) }

                />
            }

            {(location === '/newuser' || location === '/newlocation') &&
                <input
                    data-cy='address-input'
                    name='address'
                    placeholder='Address'
                    type='text'
                    value={address}
                    onChange={ e => setAddress(e.target.value) }
                />
            }

            {(location === '/newuser' || location === '/newlocation') &&
                <input 
                    data-cy='city-input'
                    name='city'
                    placeholder='City'
                    type='text'
                    value={city}
                    onChange={ e => setCity(e.target.value) }
                />
            }

            {(location === '/newuser' || location === '/newlocation') &&
                <input 
                    data-cy='zip-input'
                    name='zip'
                    placeholder='Zip Code'
                    type='text'
                    value={zip}
                    onChange={ e => setZip(e.target.value) }
                />
            }

            {location === '/login' &&
                <Link to='/map'>
                <button className="button" data-cy='login-button' onClick={handleSubmit}>Login</button>
                </Link>
            }

            {location === '/login' &&
            <p className='filler-text'>or are you a</p>}

            {location === '/login' &&
                <Link to='/newuser'>
                <button className='button' data-cy='new-user-button'>New User?</button>
                </Link>
            }

            {location === '/newuser' &&
                <Link to='/login'>
                <button className='button' data-cy='create-account' onClick={handleSubmit}>Create Account</button>
                </Link>
            }

            {location === '/newlocation' &&
                <Link to='/map'>
                    <button className='button' data-cy='lets-eat-button' onClick={handleSubmit}>Let's Eat!</button>
                </Link>
            }
        </form>
    )
}

export default Form;
