import { Link, useLocation, Redirect } from 'react-router-dom';
import { useState } from 'react';
const Form = ({ createNewUser, loginUser, updateLocation, error, clearError, newUserError }) => {

    const location = useLocation().pathname
    const [userName, setUserName] = useState('')
    const [first, setFirst] = useState('')
    const [last, setLast] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    const [inputError, setInputError] = useState('')
   
    const handleSubmit = e => {
        if (location === '/newuser' && first && last && address && city && zipAuth(zip) ) {
            createNewUser(userName, first, last, address, city, zip)
            clearInputs()
        } else if (location === '/login' && userName) {
            loginUser(userName)
            clearInputs()
        } else if (location === '/newlocation' && address && city && zipAuth(zip) ) {
            updateLocation(address, city, zip)
            clearInputs()
        } else {
            e.preventDefault()
            setInputError('Please Complete The Form Below.')
        }
    }

    const zipAuth = zip => {
        const canada = /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
        const us = /^[0-9]{5}(?:-[0-9]{4})?$/
        return (canada.exec(zip) || us.exec(zip) ? true : false)
        
        }

    const clearInputs = () => {
        setUserName('')
        setFirst('')
        setLast('')
        setAddress('')
        setCity('')
        setZip('')
        setInputError('')
        clearError()
    }

    return (
        <form>
            {inputError && <h2 className='error' data-cy='input-error'>{inputError}</h2>}
            {(error.includes('4') || newUserError) && <h2 className='error' data-cy='username-error'>Please Try A Different Username.</h2>}
            {newUserError && <Redirect to='/newuser'/>}
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
                    aria-label="username input"
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
                    aria-label="first name input"
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
                    aria-label="last name input" 
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
                    aria-label="address input"
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
                    aria-label="city input" 
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
                    aria-label="zip code input"
                />
            }

            {location === '/login' &&
                <Link to='/map' onClick={handleSubmit}>
                <button className="button" data-cy='login-button'>Login</button>
                </Link>
            }

            {location === '/login' &&
            <p className='filler-text'>or are you a</p>}

            {location === '/login' &&
                <Link to='/newuser' onClick={clearInputs}>
                <button className='button' data-cy='new-user-button'>New User?</button>
                </Link>
            }

            {location === '/newuser' &&
                <Link to='/login' onClick={handleSubmit}>
                    <button className='button' data-cy='create-account'>Create Account</button>
                </Link>
            }

            {location === '/newlocation' &&
                <Link to='/map' onClick={handleSubmit}>
                    <button className='button' data-cy='lets-eat-button'>Let's Eat!</button>
                </Link>
            }
            {location === '/newuser' && 
                <Link to='/login' onClick={clearInputs}>
                    <p className='go-back-link' data-cy='back-to-login'>back to login</p>
                </Link>
            }
            {location === '/newlocation' && 
                <Link to='/map'>
                    <p className='go-back-link' data-cy='back-to-map'>back to map</p>
                </Link>
            }
        </form>
    )
}

export default Form;
